import { Router } from "express";

import { findAllTomes, findTomeByID } from "../controllers/tome.controller.js";

const router = Router();

// Récupère tous les tomes
router.get("/", findAllTomes);

// Récupère un tome par ID
router.get("/:id", findTomeByID);

export default router;
