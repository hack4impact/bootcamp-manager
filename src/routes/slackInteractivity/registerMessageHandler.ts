import axios from "axios";
import { Request, Response } from "express";
import { UserModel } from "../../schemas/User";
import {
  cancelButton,
  submitButton,
} from "../../utils/slackMessageTemplates/registerMessage";

export default async function registerMessageHandler(
  req: Request,
  res: Response,
  next: Function
) {
  const { payload } = req.body;
  let user = await UserModel.findById(payload.user.id);

  if (payload.actions[0]?.value === submitButton.action_id) {
    const chapterSelectResult =
      payload?.state?.values?.registerMessage?.chapterSelect?.selected_option
        ?.value;
    const semesterSelectResult =
      payload?.state?.values?.registerMessage?.semesterSelect.selected_option
        ?.value;

    if (chapterSelectResult && semesterSelectResult) {
      let text =
        "Your bootcamp registration is completed. If you made a mistake, just use the /register command again. (Your assignments will be saved) Head to the home page to get more info about the bootcamp. Thanks!";

      if (user) {
        text = "We've updated your bootcamp information. Have a good day!";
        user.chapterName = chapterSelectResult;
      } else {
        user = new UserModel({
          _id: payload.user.id,
          chapterName: chapterSelectResult,
        });
      }
      user.save();

      axios.post(payload.response_url, {
        replace_original: true,
        text,
      });
    }
    res.status(200).end();
  } else if (payload.actions[0]?.value === cancelButton.action_id) {
    let text = "Your bootcamp registration has been canceled. Have a nice day!";
    if (user) {
      text = "No settings changed. Have a nice day!";
    }
    axios.post(payload.response_url, {
      replace_original: true,
      text,
    });
    res.status(200).end();
  } else {
    res.status(200).end();
  }
}
