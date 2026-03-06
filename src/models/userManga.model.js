import { DataTypes, Model } from "sequelize";

export class UserManga extends Model {}

export function initUserMangaModel(sequelize) {
  UserManga.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: DataTypes.STRING, allowNull: false },
      tomeId: { type: DataTypes.INTEGER, allowNull: true },
      mangaId: { type: DataTypes.INTEGER, allowNull: true },
      statusCollection: {
        type: DataTypes.ENUM("collection", "wishlist", "pret"),
        allowNull: false,
      },
      statusFil: {
        type: DataTypes.ENUM("PAL", "en cours", "lu"),
      },
    },
    {
      sequelize,
      modelName: "user_manga",
      tableName: "user_manga",
    },
  );
  return UserManga;
}
