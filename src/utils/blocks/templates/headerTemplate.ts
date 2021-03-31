import { HeaderBlock } from "@slack/bolt";

export default function headerTemplate(text: string): HeaderBlock {
  return {
    type: "header",
    text: {
      type: "plain_text",
      text,
    },
  };
}
