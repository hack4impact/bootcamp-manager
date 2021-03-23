import { Router, json, urlencoded } from "express";
import slackCommand from "./utils/handleSlackCommand";
import { Register } from "./routes/register";

export const slackRouter = Router();

slackRouter.use(json());
slackRouter.use(urlencoded({ extended: false }));

slackRouter.use(slackCommand("/register", Register));
