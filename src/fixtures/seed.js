import { fakerFR as faker } from "@faker-js/faker";
import { Manga, Tome } from "../models/index.js";
import chalk from "chalk"; // Couleurs dans la console, confort du développeur

const GENRES = ["Shonen", "Seinen", "Shojo", "Josei", "Isekai", "Kodomo"];

async function generateMangas(nb = 10) {
  const mangas = [];

  for (let i = 0; i < nb; i++) {
    mangas.push({
      titre: faker.lorem.words({ min: 1, max: 3 }),
      auteur: faker.person.fullName(),
      edition: faker.company.name(),
      genre: faker.helpers.arrayElement(GENRES),
      nbTomes: faker.number.int({ min: 1, max: 50 }),
      termine: faker.datatype.boolean(),
      description: faker.lorem.paragraph(),
    });
  }
  return mangas;
}

function generateTomes(manga) {
  const tomes = [];
  const nb = faker.number.int({ min: 1, max: manga.nbTomes });

  for (let i = 1; i < nb; i++) {
    tomes.push({
      mangaID: manga.id, // clé étrangère
      numero: i,
      image: faker.image.avatar(),
      dateSortie: faker.date.past(),
    });
  }

  return tomes;
}

export async function runSeed() {
  let mangas = await Manga.findAll();

  // Series mangas

  if (mangas.length === 0) {
    const mangaDatas = await generateMangas(10);
    mangas = await Manga.bulkCreate(mangaDatas, { returning: true }); // returning: true, permet la récupèration des ID créés automatiquement en base mysql.
  }

  // Tomes
  const tomeCount = await Tome.count();

  if (tomeCount === 0) {
    for (const manga of mangas) {
      const tomeDatas = generateTomes(manga);
      await Tome.bulkCreate(tomeDatas);
    }
  }

  console.log(chalk.yellowBright("OK Fixtures insérées avec succès"));
}
