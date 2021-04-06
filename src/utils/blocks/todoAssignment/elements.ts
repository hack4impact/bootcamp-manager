export const submitButton = (assignmentId: string) => ({
  type: "button",
  text: {
    type: "plain_text",
    text: "Submit Assignment",
  },
  value: "submit",
  action_id: `submit_assignment_${assignmentId}`,
  style: "primary",
});
