import { Router } from "express";
import auth from "../middlewares/auth.js";
import { getUserSuggestions } from "../controllers/suggestion.controller.js";

const router = Router();

router.get("/", auth, getUserSuggestions);

export default router;
