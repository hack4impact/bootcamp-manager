import { View } from "@slack/bolt";
import dividerTemplate from "../../blocks/templates/dividerTemplate";
import plainTextTemplate from "../../blocks/templates/plainTextTemplate";
import { registerMessage } from "../../blocks/registerMessage/registerMessage";
import headerTemplate from "../../blocks/templates/headerTemplate";

export default function newUserView(): View {
  return {
    type: "home",
    blocks: [
      headerTemplate("Bootcamp Registration"),
      plainTextTemplate(
        "Hey there! If you're looking to register for the H4I bootcamp, please fill out the form below."
      ),
      dividerTemplate(),
      registerMessage(),
      dividerTemplate(),
      plainTextTemplate("And if you're just passing by, have a wonderful day!"),
    ],
  };
}
