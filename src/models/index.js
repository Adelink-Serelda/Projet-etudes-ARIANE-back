import { initMangaModel, Manga } from "./manga.model.js";
import { initTomeModel, Tome } from "./tome.model.js";

export async function initModels(sequelize) {
  initMangaModel(sequelize);
  initTomeModel(sequelize);

  // Relations 1-N
  Manga.hasMany(Tome, {
    foreignKey: "mangaID",
    onDelete: "CASCADE",
  });

  Tome.belongsTo(Manga, {
    foreignKey: "mangaID",
  });
}

export { Manga, Tome };
