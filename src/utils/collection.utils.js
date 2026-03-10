import { Manga, Tome, UserManga } from "../models/index.js";

export async function findMangaAndTome(mangaId, tomeNumero) {
  const manga = await Manga.findOne({ where: { idJson: mangaId } });
  if (!manga) return { manga: null, tome: null };

  const tome = await Tome.findOne({
    where: { mangaID: manga.id, numero: tomeNumero },
  });

  return { manga, tome };
}

export async function isInCollection(userId, mangaId, tomeNumero) {
  const { manga, tome } = await findMangaAndTome(mangaId, tomeNumero);

  if (!manga || !tome) return false;

  const exists = await UserManga.findOne({
    where: {
      userId,
      mangaId: manga.id,
      tomeId: tome.id,
      statusCollection: "collection",
    },
  });
  return !!exists;
}
