import { Router } from "express";
import {
  addToCollection,
  getUserCollection,
  deleteFromCollection,
  checkInCollection,
  getUserCollectionByManga,
} from "../controllers/collection.controller.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.get("/check", auth, checkInCollection);
router.post("/add", auth, addToCollection);
router.get("/", auth, getUserCollectionByManga);
router.post("/delete", auth, deleteFromCollection);

export default router;
