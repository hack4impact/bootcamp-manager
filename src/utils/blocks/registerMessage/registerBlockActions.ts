import {
  AckFn,
  AllMiddlewareArgs,
  SlackAction,
  SlackActionMiddlewareArgs,
} from "@slack/bolt";
import { UserModel } from "../../../schemas/User";
import { chapterData } from "../../airtable/loadAirtableData";
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

  if (chapterSelectResult) {
    let user = await UserModel.findById(body.user.id);
    if (user) {
      throw new Error(
        "Registered user sent 'registration' Home view. Should be sent 'assignments' view."
      );
    } else {
      const chapterId = chapterData.find(
        (chapter) => chapter.fields["Chapter Name"] === chapterSelectResult
      )?.id;
      if (!chapterId) {
        throw new Error(
          "Chapter selected does not have a corresponding airtable id."
        );
      }
      user = new UserModel({
        _id: body.user.id,
        chapterName: chapterSelectResult,
        chapterId,
      });
    }
    await user.save();
    await client.views.open({
      trigger_id: (body as Record<string, any>).trigger_id,
      view: registrationConfirmedModal(chapterSelectResult),
    });
  }
}
