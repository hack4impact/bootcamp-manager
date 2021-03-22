import { Request, Response } from "express";
export default function slackCommand(commandName: string, handler: Function) {
  return function (req: Request, res: Response, next: Function) {
    if (req.body.command === commandName) {
      handler(req, res, next);
    } else next();
  };
}
