import axios from "axios";
import { Request, Response } from "express";
import {
  cancelButton,
  submitButton,
} from "../../../utils/slackMessageTemplates/registerMessage";

export default function registerMessageHandler(
  req: Request,
  res: Response,
  next: Function
) {
  const { payload } = req.body;
  if (payload.actions[0]?.action_id === submitButton.action_id) {
    res.status(200).end();
  } else if (payload.actions[0]?.value === cancelButton.action_id) {
    axios.post(payload.response_url, {
      replace_original: true,
      text: "Your bootcamp registration has been canceled. Have a nice day!",
    });
    res.status(200).end();
  } else {
    res.status(200).end();
  }
}
