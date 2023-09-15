import * as dotenv from "dotenv";
import parseXMLData from "../services/xmlService";
import axios from "axios";
import logger from "../logger";

dotenv.config();

let API_URL: string | undefined = process.env.API_URL;
let API_URL_SECOND: string | undefined = process.env.API_URL_SECOND;

async function fetchAndSetReferenceRate() {
  try {
    if (!API_URL || !API_URL_SECOND) {
      throw new Error("Brak wymaganych zmiennych środowiskowych.");
    }

    const response = await axios.get(API_URL);
    const xmlData = response.data;
    const parsedData = await parseXMLData(xmlData);

    const referenceRate: number = parseFloat(
      parsedData.stopy_procentowe.tabela[0].pozycja[0][
        "$"
      ].oprocentowanie.replace(",", "."),
    );

    const today: string = new Date().toISOString().split("T")[0];
    let lastFetchDate: string | null = null;

    if (lastFetchDate === today) {
      logger.info(`Dzisiaj już pobrano stawkę referencyjną.`);
    } else {
      lastFetchDate = today;

      await axios.post(API_URL_SECOND, {
        rate: referenceRate,
        date: lastFetchDate,
      });

      logger.info(`Wartość referencyjnej stopy procentowej: ${referenceRate}`);
      logger.info(`Data pobrania: ${today}`);
    }
  } catch (error: any) {
    logger.error(
      `Błąd pobierania i ustawiania stopy referencyjnej:
      ${error.message}`
    );
  }
}

export default fetchAndSetReferenceRate;
