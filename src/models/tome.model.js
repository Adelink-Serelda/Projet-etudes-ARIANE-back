import { DataTypes, Model } from "sequelize";

// Modèle Tome : Chaque opus/tome d'un manga de la classe Manga
export class Tome extends Model {}

export function initTomeModel(sequelize) {
  Tome.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      idJson: { type: DataTypes.STRING },
      numero: { type: DataTypes.INTEGER, allowNull: false },
      titre: { type: DataTypes.STRING },
      image: { type: DataTypes.STRING },
      dateSortie: { type: DataTypes.DATEONLY },
      synopsis: { type: DataTypes.TEXT },
      mangaID: { type: DataTypes.INTEGER, allowNull: false }, // clé étrangère
    },
    { sequelize, modelName: "tome", tableName: "tome" },
  );
  return Tome;
}
