import { Sequelize } from "sequelize";
import "dotenv/config";
import { initModels } from "../models/index.js";

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_HOST ? Number(DB_PORT) : 3306,
  dialect: "mysql",
  debug: true,
});

export async function connect() {
  await sequelize.authenticate();
  initModels(sequelize); // Méthode de l'ORM pour créer et migrer les modèles
  await sequelize.sync({ force: true }); // force: true pour que sequelize fasse les modification dans la BDD (env dev)
}
