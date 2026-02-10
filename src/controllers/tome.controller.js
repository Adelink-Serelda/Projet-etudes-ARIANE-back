import { Tome } from "../models/index.js";

export async function findAllTomes(req, res) {
  const tomes = await Tome.findAll({ order: ["dateSortie"], DESC });
  return res.send(tomes);
}

export async function findTomeByID(req, res) {
  const { id } = req.params;
  const tome = await Tome.findByPk(id);
  if (!tome)
    return res.status(404).json({ message: "Ce tome est introuvable" });
  return res.send(manga);
}
