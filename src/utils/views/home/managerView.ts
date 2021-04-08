import { View } from "@slack/bolt";
import bootcampControls from "../../blocks/bootcampControls/bootcampControls";
import headerTemplate from "../../blocks/templates/headerTemplate";
import plainTextTemplate from "../../blocks/templates/plainTextTemplate";

export default function managerView(): View {
  return {
    type: "home",
    blocks: [
      headerTemplate("Welcome, manager."),
      plainTextTemplate(
        "There is not a bootcamp at Cal Poly going on currently. You can start a bootcamp by clicking on the button below."
      ),
      bootcampControls(),
    ],
  };
}
