import path from "path";
import fs from "fs";

export function searchMangas(req, res) {
  try {
    const query = (req.query.q || "").toLowerCase();

    const filePath = path.join(process.cwd(), "datas", "catalogue-mangas.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(data);

    const results = json.mangas.filter((manga) => {
      return (
        manga.titre.toLowerCase().includes(query) ||
        manga.auteur.toLowerCase().includes(query) ||
        manga.genre.toLowerCase().includes(query) ||
        manga.mangaId.toLowerCase().includes(query)
      );
    });

    const formatted = results.map((manga) => {
      const tome1 = manga.tomes?.find((t) => t.numero === 1);
      return {
        idJson: manga.id,
        titre: manga.titre,
        auteur: manga.auteur,
        genre: manga.genre,
        cover: tome1?.image || null,
        slug: manga.mangaId,
      };
    });
    res.json(formatted);
  } catch (err) {
    console.error("Erreur recherche", err);
    res.status(500).json({ error: err.message });
  }
}
