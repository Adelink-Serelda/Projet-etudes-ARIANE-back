import { getSuggestionBaseList } from "./catalogue.controller.js";
import { UserManga, Manga } from "../models/index.js";

export async function getUserSuggestions(req, res) {
  try {
    const userId = req.user.id;
    const baseList = getSuggestionBaseList();
    const userCollection = await UserManga.findAll({
      where: { userId, statusCollection: "collection" },
      include: [{ model: Manga }],
    });
    const userCollectionIds = new Set(
      userCollection.filter((m) => m.Manga).map((m) => m.Manga.idJson),
    );
    const filteredIds = baseList.filter(
      (serie) => !userCollectionIds.has(serie.idJson),
    );

    const shuffled = filteredIds.sort(() => Math.random() - 0.5);

    const limited = shuffled.slice(0, 10);

    return res.json(limited);
  } catch (err) {
    console.error("Erreur suggestion:", err);
    return res.status(500).json({ error: err.message });
  }
}
