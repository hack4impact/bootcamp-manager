import { App } from "@slack/bolt";
import { config } from "./config";
import { config as configEnv } from "dotenv-safe";
import handleRegisterCommand from "./middleware/register/registerCommand";
import * as registerMessageElements from "./utils/slackMessageTemplates/registerMessage/elements";
import * as registerBlockActions from "./middleware/register/registerBlockActions";

configEnv({
  path: "./env/.env",
  example: "./env/.env.example",
});

const app = new App({
  token: process.env.SLACK_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

(async () => {
  await config();
  await app.start(process.env.PORT ? parseInt(process.env.PORT) : 8080);
})();

app.command("/register", handleRegisterCommand);
app.action(
  {
    action_id: registerMessageElements.submitButton.action_id,
    block_id: registerMessageElements.blockId,
  },
  registerBlockActions.submitButtonAction
);
app.action(
  {
    action_id: registerMessageElements.cancelButton.action_id,
    block_id: registerMessageElements.blockId,
  },
  registerBlockActions.cancelBlockAction
);
