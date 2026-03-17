import { UserManga } from "../models/index.js";
import fs from "fs";
import path from "path";

export async function mergeCatalogueWithStatus(mangaSlug, userId) {
  const filePath = path.join(process.cwd(), "datas", "catalogue-mangas.json");
  const data = fs.readFileSync(filePath, "utf-8");
  const catalogue = JSON.parse(data);

  const manga = catalogue.mangas.find((m) => m.mangaId === mangaSlug);
  if (!manga) return null;

  const tomeIds = manga.tomes.map((t) => t.id);

  const statuses = await UserManga.findAll({
    where: {
      userId,
      tomeId: tomeIds,
    },
  });

  const tomes = manga.tomes.map((tome) => {
    const status = statuses.find((s) => s.tomeId === tome.id);
    return {
      ...tome,
      statusCollection: status?.statusCollection || null,
      statusFil: status?.statusFil || null,
    };
  });

  return {
    ...manga,
    tomes,
  };
}
