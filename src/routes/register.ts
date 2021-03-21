import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { handleValidationErrors } from "../misc/handleValidationErrors";
import { UserModel } from "../schemas/User";

export const RegisterRouter = Router();

RegisterRouter.use(
  body("name").isString().isLength({
    min: 2,
  }),
  body("slackId").isString().isLength({
    min: 5,
  }),
  body("chapterId").isInt({
    min: 1,
    max: 100,
  }),
  body("chapterName").isString().isLength({
    min: 2,
  }),
  handleValidationErrors,
  addUser
);

async function addUser(req: Request, res: Response, next: Function) {
  try {
    const { name, chapterName, chapterId, slackId } = req.body;
    if (await UserModel.exists({ _id: slackId })) {
      res.status(401).json({
        status: "error",
        message: "User already exists.",
      });
      return;
    }

    await UserModel.create({
      name,
      chapterName,
      chapterId,
      _id: slackId,
    });

    res.status(200).end();
  } catch (err) {
    res.status(401).json({
      status: "error",
      message:
        "There was an error fulfilling your request. Please try again later.",
    });
  }
}
