import { initMangaModel, Manga } from "./manga.model.js";
import { initTomeModel, Tome } from "./tome.model.js";
import { initUserMangaModel, UserManga } from "./userManga.model.js";

export async function initModels(sequelize) {
  initMangaModel(sequelize);
  initTomeModel(sequelize);
  initUserMangaModel(sequelize);

  // Relations 1-N
  Manga.hasMany(Tome, {
    foreignKey: "mangaID",
    onDelete: "CASCADE",
  });

  Tome.belongsTo(Manga, {
    foreignKey: "mangaID",
  });

  Tome.hasMany(UserManga, { foreignKey: "tomeId" });
  Manga.hasMany(UserManga, { foreignKey: "mangaId" });
  UserManga.belongsTo(Tome, { foreignKey: "tomeId" });
  UserManga.belongsTo(Manga, { foreignKey: "mangaId" });
}

export { Manga, Tome, UserManga };
