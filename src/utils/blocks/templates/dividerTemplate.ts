import { DividerBlock } from "@slack/bolt";

export default function dividerTemplate(): DividerBlock {
  return {
    type: "divider",
  };
}
