import chalk from "chalk";
import { Tome, Manga } from "../models/index.js";

export async function findAllTomes(req, res) {
  const tomes = await Tome.findAll({ order: [["dateSortie", "DESC"]] });
  return res.send(tomes);
}

export async function findTomeByID(req, res) {
  const { id } = req.params;
  const tome = await Tome.findByPk(id, {
    include: [
      {
        model: Manga,
        attributes: [
          "id",
          "titre",
          "auteur",
          "edition",
          "genre",
          "nbTomes",
          "termine",
        ],
      },
    ],
  });
  if (!tome)
    return res.status(404).json({ message: "Ce tome est introuvable" });
  return res.send(tome);
}

export async function findTomesByManga(req, res) {
  const { mangaID } = req.params;
  console.log(req.params);
  console.log(chalk.red("mangaID reçu :", mangaID));

  const manga = await Manga.findByPk(mangaID, {
    include: [{ model: Tome }],
    order: [[Tome, "numero", "ASC"]],
  });

  if (!manga) return res.status(404).json({ message: "manga introuvable" });
  return res.send(manga);
}

// export function addCollection() {}

// export function deleteCollection() {}

// export function addPAL() {}

// export function deletePAL() {}

// export function addRead() {}
