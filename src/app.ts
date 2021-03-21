import express from "express";
import { config } from "./config";
import { router } from "./router";

const app = express();
app.use(router);

config()
  .then(() => {
    app.listen(8080);
  })
  .catch((err: Error) => {
    console.log(`Config Error: ${err.message}`);
  });
