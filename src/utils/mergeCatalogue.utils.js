import { Manga, Tome, UserManga } from "../models/index.js";
import fs from "fs";
import path from "path";

export async function mergeCatalogueWithStatus(mangaSlug, userId) {
  const filePath = path.join(process.cwd(), "datas", "catalogue-mangas.json");
  const data = fs.readFileSync(filePath, "utf-8");
  const catalogue = JSON.parse(data);

  const manga = catalogue.mangas.find((m) => m.mangaId === mangaSlug);
  if (!manga) return null;

  // Récupérer les vrais tomes de la base de données avec l'idJson du catalogue
  const mangaIdJsons = manga.tomes.map((t) => t.id);
  const tomesBDD = await Tome.findAll({
    where: {
      idJson: mangaIdJsons,
    },
  });

  // Récupérer les statuts utilisateur pour ces tomes
  const tomeIds = tomesBDD.map((t) => t.id);
  const statuses = await UserManga.findAll({
    where: {
      userId,
      tomeId: tomeIds,
    },
  });

  // Fusionner les données JSON avec les statuts de la BDD
  const tomes = manga.tomes.map((tomeJson) => {
    // Trouver le tome correspondant en BDD par l'idJson
    const tomeBDD = tomesBDD.find((t) => t.idJson === tomeJson.id);

    if (!tomeBDD) {
      // Si le tome n'est pas en BDD, retourner les données JSON sans statut
      return {
        ...tomeJson,
        statusCollection: null,
        statusFil: null,
      };
    }

    // Trouver le statut pour ce tome
    const status = statuses.find((s) => s.tomeId === tomeBDD.id);

    return {
      ...tomeJson,
      databaseId: tomeBDD.id, // Inclure l'ID réel de la BDD si nécessaire
      statusCollection: status?.statusCollection || null,
      statusFil: status?.statusFil || null,
    };
  });

  return {
    ...manga,
    tomes,
  };
}
