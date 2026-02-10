import { fakerFR as faker } from "@faker-js/faker";
import { Manga } from "../models/index.js";
import chalk from "chalk";

const GENRES = ["Shonen", "Seinen", "Shojo", "Josei", "Isekai", "Kodomo"];

function generateMangas(nb = 10) {
  const mangas = [];
  for (let i = 0; i < 10; i++) {
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

export async function runSeed() {
  const mangaCount = await Manga.count();

  if (mangaCount === 0) {
    const mangaDatas = generateMangas(10);
    await Manga.bulkCreate(mangaDatas);
  }

  console.log(chalk.yellowBright("OK Fixtures insérées avec succès"));
}
