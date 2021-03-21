import { Router, json } from "express";
import registerRoute from "./routes/register";

const router = Router();

router.use(json());
router.post("/register", registerRoute);

export default router;
