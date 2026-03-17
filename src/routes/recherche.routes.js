import { Router } from "express";
import { searchMangas } from "../controllers/recherche.controller.js";

const router = Router();

router.get("/", searchMangas);

export default router;
