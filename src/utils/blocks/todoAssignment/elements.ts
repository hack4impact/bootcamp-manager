export const submitButton = (assignmentId: string, resubmit = false) => ({
  type: "button",
  text: {
    type: "plain_text",
    text: resubmit ? "Re-submit" : "Submit Assignment",
  },
  value: "submit",
  action_id: `submit_assignment_${assignmentId}`,
  style: "primary",
});
