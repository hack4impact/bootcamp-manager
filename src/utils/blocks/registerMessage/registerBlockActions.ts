import {
  AckFn,
  AllMiddlewareArgs,
  SlackAction,
  SlackActionMiddlewareArgs,
} from "@slack/bolt";
import { UserModel } from "../../../schemas/User";
import registrationConfirmedModal from "../../views/modals/registrationConfirmedModal";
import { blockId, chapterSelect } from "./elements";

export async function submitButtonAction({
  ack,
  respond,
  client,
  body,
}: SlackActionMiddlewareArgs<SlackAction> & AllMiddlewareArgs) {
  await (ack as AckFn<void>)();

  const chapterSelectResult = (body as Record<string, any>).view.state.values[
    blockId
  ][chapterSelect.action_id as string].selected_option?.value;

  console.log(chapterSelectResult);
  if (chapterSelectResult) {
    let user = await UserModel.findById(body.user.id);
    if (user) {
      throw new Error(
        "Registered user sent 'registration' Home view. Should be sent 'assignments' view."
      );
    } else {
      user = new UserModel({
        _id: body.user.id,
        chapterName: chapterSelectResult,
      });
    }
    await user.save();
    await client.views.open({
      trigger_id: (body as Record<string, any>).trigger_id,
      view: registrationConfirmedModal(chapterSelectResult),
    });
  }
}
