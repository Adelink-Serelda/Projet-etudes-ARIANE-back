import { Router } from "express";
import {
  addToCollection,
  getUserCollection,
} from "../controllers/collection.controller.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.post("/add", auth, addToCollection);
router.get("/", auth, getUserCollection);

export default router;
