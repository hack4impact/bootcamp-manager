import { View } from "@slack/bolt";
import bootcampControls from "../../blocks/bootcampControls/bootcampControls";
import plainTextTemplate from "../../blocks/templates/plainTextTemplate";

export default function managerView(): View {
  return {
    type: "home",
    blocks: [plainTextTemplate("Welcome, manager."), bootcampControls()],
  };
}
