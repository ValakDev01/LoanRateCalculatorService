import * as dotenv from "dotenv";
import express, { Router } from 'express';
import "reflect-metadata";
import logger from "./logger";
import router from "./router";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  logger.info(`Serwer uruchomiony na porcie ${PORT}`);
});
