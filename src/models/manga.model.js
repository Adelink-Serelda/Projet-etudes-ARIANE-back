import { DataTypes, Model } from "sequelize";

// Modèle Manga : Titre global des séries
export class Manga extends Model {}

export function initMangaModel(sequelize) {
  Manga.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      titre: { type: DataTypes.STRING, allowNull: false },
      auteur: { type: DataTypes.STRING },
      edition: { type: DataTypes.STRING },
      genre: {
        type: DataTypes.ENUM(
          "Shonen",
          "Seinen",
          "Shojo",
          "Josei",
          "Isekai",
          "Kodomo",
          "Yaoi",
          "Yuri",
          "Hentai",
        ),
        allowNull: false,
      },
      nbTomes: { type: DataTypes.INTEGER },
      termine: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      description: { type: DataTypes.TEXT },
    },
    {
      sequelize,
      modelName: "manga",
      tableName: "manga",
    },
  );
  return Manga;
}
