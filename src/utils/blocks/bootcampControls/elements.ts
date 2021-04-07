import { Button } from "@slack/bolt";

export const startBootcampButton: Button = {
  type: "button",
  text: {
    type: "plain_text",
    text: "Start Bootcamp",
  },
  action_id: "start_bootcamp",
  style: "primary",
};

export const finishBootcampButton: Button = {
  type: "button",
  text: {
    type: "plain_text",
    text: "Finish Bootcamp",
  },
  action_id: "finish_bootcamp",
  style: "danger",
};
