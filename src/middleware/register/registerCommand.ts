import { SlackCommandMiddlewareArgs } from "@slack/bolt";
import { UserModel } from "../../schemas/User";
import { registerMessage } from "../../utils/slackMessageTemplates/registerMessage/registerMessage";

export default async function handleRegisterCommand({
  ack,
  say,
  command,
}: SlackCommandMiddlewareArgs) {
  await ack();
  const userExists = await UserModel.exists({ _id: command.user_id });
  await say(registerMessage(userExists));
}
