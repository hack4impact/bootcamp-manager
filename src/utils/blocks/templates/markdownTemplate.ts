import { SectionBlock } from "@slack/bolt";

export default function markdownTemplate(markdown: string): SectionBlock {
  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text: markdown,
    },
  };
}
