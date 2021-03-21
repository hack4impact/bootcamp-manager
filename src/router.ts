import { Router, json } from "express";
import { RegisterRouter } from "./routes/register";

export const router = Router();
router.use(json());

router.post("/register", RegisterRouter);
