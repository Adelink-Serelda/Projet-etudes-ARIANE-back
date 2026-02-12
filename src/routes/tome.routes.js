import { Router } from "express";

import {
  findAllTomes,
  findTomeByID,
  findTomesByManga,
} from "../controllers/tome.controller.js";

const router = Router();

// Récupère tous les tomes
router.get("/", findAllTomes);

// Récupère tous les tomes d'un manga donné
router.get("/mangas/:mangaID/tomes", findTomesByManga);

// Récupère un tome par ID
router.get("/:id", findTomeByID);

export default router;
