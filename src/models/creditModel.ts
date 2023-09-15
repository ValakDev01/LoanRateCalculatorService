import Joi from "joi";

const creditSchema = Joi.object({
  numberOfInstallments: Joi.number().integer().min(1).required(),
  remainingInstallments: Joi.number().integer().min(1).required(),
  installmentAmount: Joi.number().min(1).required(),
  financingAmount: Joi.number().min(1).required(),
  interestRate: Joi.number().min(1).required(),
});

export default creditSchema;