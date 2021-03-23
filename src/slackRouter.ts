import { Router, json, urlencoded } from "express";
import slackCommand from "./utils/handleSlackCommand";
import { Register } from "./routes/slackCommands/register";
import blockAction from "./utils/handleSlackBlockActions";
import { interactiveBlock as registerMessage } from "../utils/slackMessageTemplates/registerMessage";
import registerMessageHandler from "./routes/slackInteractivity/registerMessageHandler";

export const slackRouter = Router();

slackRouter.use(json());
slackRouter.use(urlencoded({ extended: false }));

slackRouter.use(slackCommand("/register", Register));

slackRouter.use(
  blockAction(registerMessage.block_id as string, registerMessageHandler)
);
