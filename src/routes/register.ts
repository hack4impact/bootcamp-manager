import { Request, Response } from "express";
import { UserModel } from "../schemas/User";

export default async function (req: Request, res: Response, next: Function) {
  try {
    const { name, chapterName, chapterId, slackId } = req.body;
    await UserModel.create({
      name,
      chapterName,
      chapterId,
      slackId,
    });

    res.status(200).end();
  } catch (err) {
    res.status(401).json({
      status: "error",
      message: "Incorrect request body.",
    });

    console.log(`Error on request to /register. Error: ${err}`);
  }
}
