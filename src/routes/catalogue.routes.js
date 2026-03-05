import {
  getJsonCatalogue,
  getTomeById,
  getTomeByMangaAndNumber,
  getTomesByManga,
} from "../controllers/catalogue.controller.js";
import { Router } from "express";

const router = Router();

// Récupère les données du catalogue format JSON
router.get("/:manga/:numero", getTomeByMangaAndNumber);
router.get("/:mangaID/tomes", getTomesByManga);
router.get("/:id", getTomeById);
router.get("/", getJsonCatalogue);

export default router;
