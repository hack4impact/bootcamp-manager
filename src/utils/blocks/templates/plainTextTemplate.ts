import { SectionBlock } from "@slack/bolt";

export default function plainTextTemplate(text: string): SectionBlock {
  return {
    type: "section",
    text: {
      type: "plain_text",
      text: text,
    },
  };
}
