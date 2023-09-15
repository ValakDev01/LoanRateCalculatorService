import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import axios from "axios";

AppDataSource.initialize()
  .then(async () => {
    axios
      .get("http://localhost:3000/getReferenceRate")
      .then(async (response) => {
        const { savedRate, lastFetchDateResponse, nIAARR, nRFA } =
          response.data;

        const user = new User();
        user.installmentAmount = nIAARR;
        user.financingAmount = nRFA;
        user.referenceRate = savedRate;
        user.lastFetchDateResponse = lastFetchDateResponse;

        await AppDataSource.manager.save(user);
        console.log("Saved a new rate with id: " + user.id);

        const users = await AppDataSource.manager.find(User);
        console.log("Loaded rates: ", users);
      })
      .catch((error) => {
        console.error(error);
      });
  })
  .catch((error) => console.log(error));
