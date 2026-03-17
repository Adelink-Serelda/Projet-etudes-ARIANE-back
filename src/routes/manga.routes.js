import { Router } from "express";
import auth from "../middlewares/auth.js";

import {
  findAllMangas,
  findMangaByID,
  vueManga,
} from "../controllers/manga.controller.js";

const router = Router();

// Récupère un manga avec ses tomes et les status de l'user connecté
router.get("/:slug", auth, vueManga);

// Récupère un manga par ID
router.get("/:id", findMangaByID);

// Récupère tous les mangas
router.get("/", findAllMangas);

export default router;
