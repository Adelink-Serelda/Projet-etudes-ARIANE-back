import { DataTypes, Model } from "sequelize";

export class Tome extends Model {}

export function initTomeModel(sequelize) {
  Tome.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      numero: { type: DataTypes.INTEGER, allowNull: false },
      image: { type: DataTypes.STRING },
      collection: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      pal: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      lu: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    },
    { sequelize, modelName: "tome", tableName: "tome" },
  );
  return Tome;
}
