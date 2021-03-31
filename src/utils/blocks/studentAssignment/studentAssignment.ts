import { KnownBlock } from "@slack/bolt";
import dividerTemplate from "../templates/dividerTemplate";
import headerTemplate from "../templates/headerTemplate";
import { submitButton } from "./elements";

export default function studentAssignment(
  assignmentName: string,
  assignmentOrder: number,
  assignmentLink: string
): KnownBlock[] {
  return [
    headerTemplate(`${assignmentOrder}. ${assignmentName}`),
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `Link to assingnment: <assignmentLink>`,
      },
    },
    {
      type: "actions",
      elements: [submitButton(assignmentOrder)],
      block_id: `submit_assignment`,
    },
    dividerTemplate(),
  ];
}
