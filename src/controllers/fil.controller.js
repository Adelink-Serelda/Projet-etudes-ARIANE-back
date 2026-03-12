import { UserManga, Manga, Tome } from "../models/index.js";
import {
  getUserPALByMangaSQL,
  countUserSeriesPALSQL,
  countUserTomesPALSQL,
} from "../repository/fil.repository.js";

export async function getUserPALByMangas(req, res) {
  try {
    const userId = req.user.id;
    console.log("userId : ", userId);
    const pal = await getUserPALByMangaSQL(userId);
    console.log("pal : ", pal);
    const [{ totalTomes }] = await countUserTomesPALSQL(userId);
    console.log("compte tomes PAL : ", totalTomes);
    const [{ totalSeries }] = await countUserSeriesPALSQL(userId);
    console.log("compte series PAL : ", totalSeries);
    return res.json({ pal, totalSeries, totalTomes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function changeToEnCours(req, res) {}

export async function changeToLu(req, res) {}
