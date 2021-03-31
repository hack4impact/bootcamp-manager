import { KnownBlock } from "@slack/bolt";
import { AssingnmentFields } from "../../../types/Assignment";
import dividerTemplate from "../templates/dividerTemplate";
import headerTemplate from "../templates/headerTemplate";
import { submitButton } from "./elements";

export default function studentAssignment(
  assignment: AssingnmentFields
): KnownBlock[] {
  return [
    headerTemplate(`${assignment.Order}. ${assignment.Name}`),
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `Link to assingnment: <assignmentLink>`,
      },
    },
    {
      type: "actions",
      elements: [submitButton(assignment.Order)],
      block_id: `submit_assignment_${assignment.Order}`,
    },
    dividerTemplate(),
  ];
}
