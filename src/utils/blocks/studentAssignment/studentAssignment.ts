import { KnownBlock } from "@slack/bolt";
import { AssingnmentFields } from "../../../types/Assignment";
import dividerTemplate from "../templates/dividerTemplate";
import headerTemplate from "../templates/headerTemplate";
import { submitButton } from "./elements";

export default function studentAssignment(
  assignment: AssingnmentFields,
  assignmentId: string,
  completedLink: string | undefined = undefined
): KnownBlock[] {
  return [
    dividerTemplate(),
    headerTemplate(`${assignment.Order}. ${assignment.Name}`),
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `Link to assignment: <${assignment.Link}>`,
      },
    },
    {
      type: "actions",
      elements: [submitButton(assignmentId)],
      block_id: `submit_assignment_${assignmentId}`,
    },
  ];
}
