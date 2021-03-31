export const submitButton = (assignmentOrder: number) => ({
  type: "button",
  text: {
    type: "plain_text",
    text: "Submit Assignment",
  },
  value: "submit",
  action_id: `submit_assignment_${assignmentOrder}`,
  style: "primary",
});
