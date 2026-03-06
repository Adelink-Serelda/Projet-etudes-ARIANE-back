import { UserManga, Manga, Tome } from "../models/index.js";
import fs from "fs";
import path from "path";

export async function addToCollection(req, res) {
  try {
    const { mangaId, tomeNumero } = req.body;
    const userId = req.user.id;

    // Vérifier si le manga existe en base
    let manga = await Manga.findOne({ where: { idJson: mangaId } });
    console.log("mangaId : " + mangaId);
    console.log(manga);

    // S'il n'existe pas : le créer avant de l'ajouter à la collection
    if (!manga) {
      const filePath = path.join(
        process.cwd(),
        "datas",
        "catalogue-mangas.json",
      );
      const json = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      const mangaData = json.mangas.find((m) => m.id === Number(mangaId));

      if (!mangaData) {
        return res
          .status(404)
          .json({ message: "Manga introuvable dans le catalogue" });
      }

      // Création du manga en BDD
      manga = await Manga.create({
        idJson: mangaData.id,
        slug: mangaData.mangaId,
        titre: mangaData.titre,
        auteur: mangaData.auteur,
        edition: mangaData.edition,
        genre: mangaData.genre,
        nbTomes: mangaData.nbTomes,
        termine: mangaData.termine,
        description: mangaData.description,
      });

      // Création des tomes du manga
      for (const t of mangaData.tomes) {
        await Tome.create({
          idJson: t.id,
          mangaID: manga.id,
          numero: t.numero,
          titre: t.titre,
          image: t.image,
          dateSortie: t.date,
          synopsis: t.synopsis,
        });
      }
    }

    // Récupérer tome à ajouter à la collection
    const tome = await Tome.findOne({
      where: { mangaID: manga.id, numero: tomeNumero },
    });

    if (!tome) {
      return res.status(404).json({ message: "Tome introuvable" });
    }

    // Vérifier si il existe déjà dans la collection
    const exists = await UserManga.findOne({
      where: {
        userId,
        mangaId: manga.id,
        tomeId: tome.id,
        statusCollection: "collection",
      },
    });

    if (exists) {
      return res.status(400).json({ message: "Déjà dans la collection" });
    }

    // Ajouter le manga à la collection
    const entry = await UserManga.create({
      userId,
      mangaId: manga.id,
      tomeId: tome.id,
      statusCollection: "collection",
    });

    return res.json({ message: "Ajouté à la collection", entry });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function getUserCollection(req, res) {
  try {
    const userId = req.user.id;

    const collection = await UserManga.findAll({
      where: { userId, status: "collection" },
      include: [
        {
          model: Manga,
        },
      ],
    });
    return res.send(collection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
