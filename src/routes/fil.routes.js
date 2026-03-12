import { Router } from "express";
import { getUserPALByMangas } from "../controllers/fil.controller.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get("/", auth, getUserPALByMangas);

export default router;
