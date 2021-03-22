import { Request, Response } from "express";
import { validationResult } from "express-validator";

export function handleRequestValidationErrors(
  req: Request,
  res: Response,
  next: Function
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() }).end();
  } else next();
}
