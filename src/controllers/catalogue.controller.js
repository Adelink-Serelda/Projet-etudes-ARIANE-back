import fs from "fs";
import path from "path";

// Récupère les données du catalogue json
export function getJsonCatalogue(req, res) {
  const filePath = path.join(process.cwd(), "datas", "catalogue-mangas.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Erreur lecture fichier JSON" });
    }

    const json = JSON.parse(data);

    const allTomes = [];

    json.mangas.forEach((manga) => {
      manga.tomes.forEach((tome) => {
        allTomes.push({
          id: tome.id,
          numero: tome.numero,
          sousTitre: tome.titre,
          synopsis: tome.synopsis,
          image: tome.image,
          dateSortie: tome.date,
          manga: {
            id: manga.id,
            titre: manga.titre,
            auteur: manga.auteur,
            edition: manga.edition,
            genre: manga.genre,
            nbTomes: manga.nbTomes,
            termine: manga.termine,
          },
        });
      });
    });

    allTomes.sort((a, b) => new Date(b.dateSortie) - new Date(a.dateSortie));

    const top20 = allTomes.slice(0, 50);
    console.log("top20: ", top20.length);
    console.log(top20);
    res.json(top20);
  });
}

// Récupère un tome par son id
export function getTomeById(req, res) {
  const filePath = path.join(process.cwd(), "datas", "catalogue-mangas.json");
  const tomeId = req.params.id;

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Erreur lecture fichier JSON" });
    }

    const json = JSON.parse(data);
    let foundTome = null;

    json.mangas.forEach((manga) => {
      manga.tomes.forEach((tome) => {
        if (tome.id === tomeId) {
          foundTome = {
            id: tome.id,
            numero: tome.numero,
            sousTitre: tome.titre,
            synopsis: tome.synopsis,
            image: tome.image,
            dateSortie: tome.date,
            manga: {
              id: manga.id,
              titre: manga.titre,
              auteur: manga.auteur,
              edition: manga.edition,
              genre: manga.genre,
              nbTomes: manga.nbTomes,
              termine: manga.termine,
            },
          };
        }
      });
    });
    if (!foundTome) {
      return res.status(404).json({ message: "Tome introuvable" });
    }
    res.json(foundTome);
  });
}

// Récupère tous les tomes d'un manga par son id
export function getTomesByManga(req, res) {
  const filePath = path.join(process.cwd(), "datas", "catalogue-mangas.json");
  const { mangaID } = req.params;

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Erreur lecture fichier JSON" });
    }

    const json = JSON.parse(data);
    const manga = json.mangas.find(
      (m) => m.id.toLowerCase() === mangaID.toLowerCase()
    );

    if (!manga) {
      return res.status(404).json({ message: "Manga introuvable" });
    }

    return res.json(manga.tomes);
  });
}

// Récupère un tome d'un manga précis
export function getTomeByMangaAndNumber(req, res) {
  const filePath = path.join(process.cwd(), "datas", "catalogue-mangas.json");
  const { manga, numero } = req.params;

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Erreur lecture fichier JSON" });
    }

    const json = JSON.parse(data);
    // compare lowercase to accept titles or ids with different casing
    const mangaData = json.mangas.find(
      (m) => m.id.toLowerCase() === manga.toLowerCase()
    );

    if (!mangaData) {
      return res.status(404).json({ message: "Manga introuvable" });
    }

    const tome = mangaData.tomes.find((t) => t.numero === Number(numero));

    if (!tome) {
      return res.status(404).json({ message: "Tome introuvable" });
    }

    return res.json({
      id: tome.id,
      numero: tome.numero,
      sousTitre: tome.titre,
      synopsis: tome.synopsis,
      image: tome.image,
      dateSortie: tome.date,
      manga: {
        id: mangaData.id,
        titre: mangaData.titre,
        auteur: mangaData.auteur,
        edition: mangaData.edition,
        genre: mangaData.genre,
        nbTomes: mangaData.nbTomes,
        termine: mangaData.termine,
      },
    });
  });
}
