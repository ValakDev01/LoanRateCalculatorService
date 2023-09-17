import express, { Request, Response, Router } from "express";
import sendEmail from "./services/emailService";
import creditSchema from "./models/creditModel";
import logger from "./logger";
import fetchAndSetReferenceRate from "./controllers/referenceRateController";
import ERROR_MESSAGES from './services/errorMessages';
import * as dotenv from "dotenv";

dotenv.config();

let savedRate: number | null = null;
let lastFetchDateResponse: string | null = null;
let nIAARR: number | null = null;
let nRFA: number | null = null;

const router: Router = express.Router();

const RECIPIENT_ADDRESS: string | undefined = process.env.RECIPIENT_ADDRESS;

router.post("/setReferenceRate", (req: Request, res: Response) => {
  const { rate, date } = req.body;
  savedRate = rate;
  lastFetchDateResponse = date;
});

router.get("/getReferenceRate", (req: Request, res: Response) => {
  if (savedRate !== null) {
    res.status(200).json({ savedRate, lastFetchDateResponse, nIAARR, nRFA });
  } else {
    res.status(404).json({
      message: ERROR_MESSAGES.REFERENCE_RATE_NOT_SET_MESSAGE
    });
  }
});

router.post('/calculate', (req: Request, res: Response) => {
  const { error } = creditSchema.validate(req.body);

  if (error) {
    return res.status(422).json({ error: error.details[0].message });
  }

  const {
    numberOfInstallments,
    remainingInstallments,
    installmentAmount,
    financingAmount,
    interestRate,
  } = req.body;

  if (savedRate !== null) {
    if (interestRate <= savedRate) {
      let newInstallmentAmountAtReferenceRate = installmentAmount;

      let newRemanewiningFinancingAmount =
        financingAmount * (1 + interestRate / 100) -
        (numberOfInstallments - remainingInstallments) * installmentAmount;
      
      nIAARR = newInstallmentAmountAtReferenceRate;
  
      if (newRemanewiningFinancingAmount > 0) {
        nRFA = newRemanewiningFinancingAmount;
      } else {
        nRFA = null;

        return res.status(400).json({
          error:
            ERROR_MESSAGES.WRONG_AMOUNT
        });
      }

      if (numberOfInstallments < remainingInstallments) {
        return res.status(400).json({
          error:
            ERROR_MESSAGES.INSTALLMENT_COUNT_MORE_THAN_ALL
        });
      }

      if (newInstallmentAmountAtReferenceRate < 0) {
        logger.info(
          ERROR_MESSAGES.NEGATIVE_INSTALLMENT_VALUE
        );

        sendEmail(RECIPIENT_ADDRESS, newInstallmentAmountAtReferenceRate, lastFetchDateResponse);

        return res
          .status(400)
          .json({ error: ERROR_MESSAGES.RATE_BELLOW_ZERO });
      }

      logger.info(
        JSON.stringify({
          newInstallmentAmountAtReferenceRate,
          newRemanewiningFinancingAmount,
        }),
      );

      return res.status(200).json({
        newInstallmentAmountAtReferenceRate,
        newRemanewiningFinancingAmount,
      });
    } else {
      return res
        .status(400)
        .json({ error: ERROR_MESSAGES.HIGH_INTEREST_RATE });
    }
  } else {
    return res
      .status(400)
      .json({ error: ERROR_MESSAGES.NULL_RATE_PARAMETER });
  }
});

fetchAndSetReferenceRate();

//If you want to check the operation of the function below, comment out the following line of code
// sendEmail(RECIPIENT_ADDRESS, -199.99, new Date().toISOString().split("T")[0]);

export default router;