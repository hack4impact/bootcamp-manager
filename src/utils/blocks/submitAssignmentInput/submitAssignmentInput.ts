import { InputBlock, PlainTextInput } from "@slack/bolt";

export const inputPrefix = "submit_link_assignment_";
export const inputRegex = new RegExp(inputPrefix, "i");

export const inputElement: PlainTextInput = {
  type: "plain_text_input",
  action_id: "assignment_link",
};

export function submitAssignmentInput(assignmentId: string): InputBlock {
  return {
    type: "input",
    label: {
      type: "plain_text",
      text: "Assignment Link",
    },
    element: inputElement,
    block_id: `${inputPrefix}${assignmentId}`,
  };
}
