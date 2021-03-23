import { Request, Response } from "express";

export default function blockAction(blockId: string, handler: Function) {
  return function (req: Request, res: Response, next: Function) {
    if (req.body.payload) {
      req.body.payload = JSON.parse(req.body.payload);
      if (
        req.body.payload.type === "block_actions" &&
        req.body.payload.actions[0].block_id === blockId
      ) {
        handler(req, res, next);
      } else next();
    } else next();
  };
}
