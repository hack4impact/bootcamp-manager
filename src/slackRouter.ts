import { Router, json } from "express";
import slackCommand from "./misc/handleSlackCommand";
import { Register } from "./routes/register";

export const slackRouter = Router();
slackRouter.use(json());

slackRouter.use("/slack", slackCommand("register", Register));
