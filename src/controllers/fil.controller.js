import { UserManga, Manga, Tome } from "../models/index.js";
import {
  getUserPALByMangaSQL,
  countUserSeriesPALSQL,
  countUserTomesPALSQL,
} from "../repository/fil.repository.js";

export async function getUserPALByMangas(req, res) {
  try {
    const userId = req.user.id;
    const pal = await getUserPALByMangaSQL(userId);
    const [{ totalTomes }] = await countUserTomesPALSQL(userId);
    const [{ totalSeries }] = await countUserSeriesPALSQL(userId);

    const grouped = {};

    for (const tome of pal) {
      if (!grouped[tome.mangaId]) {
        grouped[tome.mangaId] = {
          mangaId: tome.mangaId,
          titre: tome.mangaTitre,
          slug: tome.mangaSlug,
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

    const userPal = Object.values(grouped);

    return res.json({ userPal, totalSeries, totalTomes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function changeToEnCours(req, res) {}

export async function changeToLu(req, res) {}
