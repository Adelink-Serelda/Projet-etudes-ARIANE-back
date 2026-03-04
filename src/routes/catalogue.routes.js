import {
  getJsonCatalogue,
  getTomeById,
} from "../controllers/catalogue.controller.js";
import { Router } from "express";

const router = Router();

// Récupère les données du catalogue format JSON
router.get("/", getJsonCatalogue);
router.get("/:id", getTomeById);

export default router;
