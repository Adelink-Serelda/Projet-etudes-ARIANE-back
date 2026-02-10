import { Router } from "express";

import {
  findAllMangas,
  findMangaByID,
} from "../controllers/manga.controller.js";

const router = Router();

// Récupère tous les mangas
router.get("/", findAllMangas);

// Récupère un manga par ID
router.get("/:id", findMangaByID);

export default router;
