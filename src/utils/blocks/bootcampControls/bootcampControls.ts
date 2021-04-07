import { ActionsBlock } from "@slack/bolt";
import { finishBootcampButton, startBootcampButton } from "./elements";

export default function bootcampControls(): ActionsBlock {
  return {
    type: "actions",
    elements: [startBootcampButton, finishBootcampButton],
  };
}
