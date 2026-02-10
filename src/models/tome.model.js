import { DataTypes, Model } from "sequelize";

// Modèle Tome : Chaque opus/tome d'un manga de la classe Manga
export class Tome extends Model {}

export function initTomeModel(sequelize) {
  Tome.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      numero: { type: DataTypes.INTEGER, allowNull: false },
      image: { type: DataTypes.STRING },
      dateSortie: { type: DataTypes.DATEONLY },
      collection: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      pal: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      lu: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      mangaID: { type: DataTypes.INTEGER, allowNull: false }, // clé étrangère
    },
    { sequelize, modelName: "tome", tableName: "tome" },
  );
  return Tome;
}
