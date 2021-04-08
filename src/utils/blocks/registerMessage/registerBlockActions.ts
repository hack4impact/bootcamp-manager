import {
  AckFn,
  AllMiddlewareArgs,
  SlackAction,
  SlackActionMiddlewareArgs,
} from "@slack/bolt";
import { UserModel } from "../../../schemas/User";
import { chapterData } from "../../airtable/loadAirtableData";
import getCurrentBootcamp from "../../bootcamp/getCurrentBootcamp";
import { publishHome } from "../../publishHome";
import bootcampNotAvailable from "../../views/modals/bootcampNotAvailable";
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
      const chapter = chapterData.find(
        (chapter) => chapter.fields["Chapter Name"] === chapterSelectResult
      );

      if (!chapter) {
        throw new Error(
          "Chapter selected does not have a corresponding airtable id."
        );
      }

      const bootcamp = await getCurrentBootcamp(chapter.id);

      if (!bootcamp) {
        await client.views.open({
          trigger_id: (body as Record<string, any>).trigger_id,
          view: bootcampNotAvailable(chapter),
        });
        return;
      }

      user = new UserModel({
        _id: body.user.id,
        chapterName: chapterSelectResult,
        chapterId: chapter.id,
      });
    }

    await user.save();
    await client.views.open({
      trigger_id: (body as Record<string, any>).trigger_id,
      view: registrationConfirmedModal(chapterSelectResult),
    });

    await publishHome(client, body.user.id);
  }
}
