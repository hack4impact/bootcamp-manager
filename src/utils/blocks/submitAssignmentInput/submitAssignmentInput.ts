import { InputBlock } from "@slack/bolt";

export const inputPrefix = "submit_link_assignment_";
export const inputRegex = new RegExp(inputPrefix, "i");

export function submitAssignmentInput(assignmentId: string): InputBlock {
  return {
    type: "input",
    label: {
      type: "plain_text",
      text: "Assignment Link",
    },
    element: {
      type: "plain_text_input",
      action_id: `${inputPrefix}${assignmentId}`,
    },
    block_id: `${inputPrefix}${assignmentId}`,
  };
}
