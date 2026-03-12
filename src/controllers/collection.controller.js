import { UserManga, Manga, Tome } from "../models/index.js";
import { isInCollection, findMangaAndTome } from "../utils/collection.utils.js";
import {
  getUserCollectionByMangaSQL,
  countUserSeriesCollectionSQL,
  countUserTomesCollectionSQL,
} from "../repository/collection.repository.js";
import fs from "fs";
import path from "path";
import { col } from "sequelize";

export async function addToCollection(req, res) {
  try {
    const { mangaId, tomeNumero } = req.body;
    const userId = req.user.id;

    if (await isInCollection(userId, mangaId, tomeNumero)) {
      return res.status(400).json({ message: "Déjà dans la collection" });
    }

    let { manga, tome } = await findMangaAndTome(mangaId, tomeNumero);

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

    tome = await Tome.findOne({
      where: { mangaID: manga.id, numero: tomeNumero },
    });

    if (!tome) {
      return res.status(404).json({ message: "Tome introuvable" });
    }

    // Ajouter le manga à la collection
    const entry = await UserManga.create({
      userId,
      mangaId: manga.id,
      tomeId: tome.id,
      statusCollection: "collection",
      statusFil: "PAL",
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
      where: { userId, statusCollection: "collection" },
      include: [
        {
          model: Manga,
        },
        {
          model: Tome,
        },
      ],
    });
    return res.send(collection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getUserCollectionByManga(req, res) {
  try {
    const userId = req.user.id;
    const collection = await getUserCollectionByMangaSQL(userId);
    const [{ totalTomes }] = await countUserTomesCollectionSQL(userId);
    const [{ totalSeries }] = await countUserSeriesCollectionSQL(userId);

    const grouped = {};

    for (const tome of collection) {
      if (!grouped[tome.mangaId]) {
        grouped[tome.mangaId] = {
          mangaId: tome.mangaId,
          titre: tome.mangaTitre,
          termine: tome.mangaTermine,
          nbTomesTotal: tome.nbTomesTotal,
          tomes: [],
        };
      }
      grouped[tome.mangaId].tomes.push({
        id: tome.tomeId,
        numero: tome.tomeNumero,
        titre: tome.tomeTitre,
        image: tome.tomeImage,
      });
    }

    const userCollection = Object.values(grouped);

    return res.json({ userCollection, totalSeries, totalTomes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteFromCollection(req, res) {
  try {
    const userId = req.user.id;
    const { mangaId, tomeNumero } = req.body;

    const { manga, tome } = await findMangaAndTome(mangaId, tomeNumero);

    if (!manga || !tome) {
      return res
        .status(404)
        .json({ message: "Manga ou tome introuvable en base" });
    }

    // Chercher l'entrée UserManga pour cet utilisateur
    const entry = await UserManga.findOne({
      where: {
        userId,
        mangaId: manga.id,
        tomeId: tome.id,
        statusCollection: "collection",
      },
    });

    if (!entry) {
      return res
        .status(404)
        .json({ message: "Ce tome n'est pas dans ta collection" });
    }

    await entry.destroy();

    return res.json({ message: "Tome supprimé de ta collection !" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
}

export async function checkInCollection(req, res) {
  try {
    const userId = req.user.id;
    const { mangaId, tomeNumero } = req.query;

    const exists = await isInCollection(userId, mangaId, tomeNumero);

    return res.json({ exists });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
