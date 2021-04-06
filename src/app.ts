import { App } from "@slack/bolt";
import { config } from "./config";
import { config as configEnv } from "dotenv-safe";
import * as registerMessageElements from "./utils/blocks/registerMessage/elements";
import * as registerBlockActions from "./utils/blocks/registerMessage/registerBlockActions";
import { publishHomeMiddleware } from "./utils/publishHome";
import handleSubmitClick from "./utils/views/modals/submitAssignmentModal/handleSubmitClick";
import handleLinkSubmission from "./utils/blocks/submitAssignmentInput/handleLinkSubmission";
import { callbackIdPrefix } from "./utils/views/modals/submitAssignmentModal/submitAssignmentModal";

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

app.action(
  {
    action_id: registerMessageElements.submitButton.action_id,
    block_id: registerMessageElements.blockId,
  },
  registerBlockActions.submitButtonAction
);
app.event("app_home_opened", publishHomeMiddleware);

app.action(/submit_assignment_/i, handleSubmitClick);
app.view(new RegExp(callbackIdPrefix), handleLinkSubmission);
