import { View } from "@slack/bolt";
import { AssingnmentFields } from "../../../../types/Assignment";
import { submitAssignmentInput } from "../../../blocks/submitAssignmentInput/submitAssignmentInput";
import headerTemplate from "../../../blocks/templates/headerTemplate";

export default function submitAssignmentModal(
  assignment: AssingnmentFields,
  assignmentId: string
): View {
  return {
    type: "modal",
    title: {
      type: "plain_text",
      text: `Assignment Submission`,
    },
    blocks: [
      headerTemplate(`Submit work for '${assignment.Name}'`),
      submitAssignmentInput(assignmentId),
    ],
    submit: {
      type: "plain_text",
      text: "Submit",
    },
    callback_id: `${callbackIdPrefix}${assignmentId}`,
  };
}

export const callbackIdPrefix = "submit_link_assignment_";
