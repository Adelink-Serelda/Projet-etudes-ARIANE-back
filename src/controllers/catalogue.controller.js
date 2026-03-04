import fs from "fs";
import path from "path";

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
