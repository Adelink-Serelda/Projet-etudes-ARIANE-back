import { Manga } from "../models/index.js";
import { mergeCatalogueWithStatus } from "../utils/mergeCatalogue.utils.js";

export async function findAllMangas(req, res) {
  const mangas = await Manga.findAll({ order: [["titre", "ASC"]] });
  return res.send(mangas);
}

export async function findMangaByID(req, res) {
  const { id } = req.params;
  const manga = await Manga.findByPk(id);
  if (!manga) return res.status(404).json({ message: "manga introuvable" });
  return res.send(manga);
}

export async function vueManga(req, res) {
  const { slug } = req.params;
  const userId = req.user.id;

  const manga = await mergeCatalogueWithStatus(slug, userId);

  if (!manga) {
    return res.status(404).json({ message: "Manga introuvable" });
  }
  res.send(manga);
}
