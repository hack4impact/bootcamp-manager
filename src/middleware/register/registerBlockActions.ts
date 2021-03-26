import { SlackActionMiddlewareArgs } from "@slack/bolt";
import { UserModel } from "../../schemas/User";
import {
  blockId,
  chapterSelect,
} from "../../utils/slackMessageTemplates/registerMessage/elements";

export async function submitButtonAction({
  ack,
  respond,
  body,
}: SlackActionMiddlewareArgs) {
  const fullBody: Record<string, any> = body;
  await ack();

  const chapterSelectResult =
    fullBody?.state?.values[blockId][chapterSelect.action_id as string]
      ?.selected_option?.value;

  if (chapterSelectResult) {
    let user = await UserModel.findById(body.user.id);
    let text =
      "Your bootcamp registration is completed. If you made a mistake, just use the /register command again. (Your assignments will be saved) Head to the home page to get more info about the bootcamp. Thanks!";
    if (user) {
      text = "We've updated your bootcamp information. Have a good day!";
      user.chapterName = chapterSelectResult;
    } else {
      user = new UserModel({
        _id: body.user.id,
        chapterName: chapterSelectResult,
      });
    }
    await user.save();
    await respond({
      replace_original: true,
      text,
    });
  }
}

export async function cancelBlockAction({
  ack,
  respond,
  body,
}: SlackActionMiddlewareArgs) {
  await ack();

  const user = await UserModel.exists({ _id: body.user.id });
  let text = "Your bootcamp registration has been canceled. Have a nice day!";

  if (user) {
    text = "No settings changed. Have a nice day!";
  }

  respond({
    replace_original: true,
    text,
  });
}
