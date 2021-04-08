import { View } from "@slack/bolt";
import { ChapterRecord } from "../../../types/Chapter";
import markdownTemplate from "../../blocks/templates/markdownTemplate";

export default function bootcampNotAvailable(chapter: ChapterRecord): View {
  return {
    type: "modal",
    title: {
      type: "plain_text",
      text: "Bootcamp not in session",
    },
    blocks: [
      markdownTemplate(
        `Unfortunately, there is not a bootcamp in session right now at ${chapter.fields["Chapter Name"]}. Please contact the bootcamp leader <@${chapter.fields["Leader Slack ID"]}> for more information.`
      ),
    ],
  };
}
