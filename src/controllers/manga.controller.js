import { Manga } from "../models/index.js";

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
