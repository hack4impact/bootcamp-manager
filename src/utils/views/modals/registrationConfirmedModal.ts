import { View } from "@slack/bolt";
import plainTextTemplate from "../../blocks/templates/plainTextTemplate";

export default function registrationConfirmedModal(chapterName: string): View {
  return {
    type: "modal",
    title: {
      type: "plain_text",
      text: "Registration Confirmed",
    },
    blocks: [
      plainTextTemplate(
        `Thanks for registering for the H4I Bootcamp at ${chapterName}. From now on, when you access the homepage, you will be able to view remaining assignments and submit your work.`
      ),
      plainTextTemplate(
        'If you accidentally signed up for the wrong chapter, scroll down to the bottom of the app home page and select "Change Chapter"'
      ),
    ],
  };
}
