import { initMangaModel, Manga } from "./manga.model.js";
import { initTomeModel, Tome } from "./tome.model.js";

export async function initModels(sequelize) {
  initMangaModel(sequelize);
  initTomeModel(sequelize);
}

export { Manga, Tome };
