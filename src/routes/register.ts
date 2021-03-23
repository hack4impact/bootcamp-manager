import { Request, Response, Router } from "express";
import registerMessage from "../../constants/slackMessageTemplates/registerMessage";

export const Register = Router();

Register.use(respond);

async function respond(req: Request, res: Response) {
  res.json(registerMessage);
}

// async function addUser(req: Request, res: Response, next: Function) {
//   try {
//     const { name, chapterName, chapterId, slackId } = req.body;
//     if (await UserModel.exists({ _id: slackId })) {
//       res.status(401).json({
//         status: "error",
//         message: "User already exists.",
//       });
//       return;
//     }

//     await UserModel.create({
//       name,
//       chapterName,
//       chapterId,
//       _id: slackId,
//     });

//     res.status(200).end();
//   } catch (err) {
//     res.status(401).json({
//       status: "error",
//       message:
//         "There was an error fulfilling your request. Please try again later.",
//     });
//   }
// }
