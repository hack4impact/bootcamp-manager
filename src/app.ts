import express from "express";
import { config } from "./config";
import { slackRouter } from "./slackRouter";

const app = express();
app.use("/slack", slackRouter);

config()
  .then(() => {
    app.listen(8080);
  })
  .catch((err: Error) => {
    console.log(`Config Error: ${err.message}`);
  });
