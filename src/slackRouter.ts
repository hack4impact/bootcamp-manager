import { Router } from "express";
import slackCommand from "./utils/slackActionHandlers/handleSlackCommand";
import { Register } from "./routes/slackCommands/register";
import blockAction from "./utils/slackActionHandlers/handleSlackBlockActions";
import { interactiveBlock as registerMessage } from "./utils/slackMessageTemplates/registerMessage";
import registerMessageHandler from "./routes/slackInteractivity/registerMessageHandler";

export const slackRouter = Router();

slackRouter.use(slackCommand("/register", Register));

slackRouter.use(
  blockAction(registerMessage.block_id as string, registerMessageHandler)
);
