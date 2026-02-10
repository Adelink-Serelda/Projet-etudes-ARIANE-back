import express from "express";
import { connect } from "./config/database.js";
import mangaRoutes from "./routes/manga.routes.js";
import { runSeed } from "./fixtures/seed.js";
import "dotenv/config";

export async function initApp() {
  const app = express();

  // Middleware Json qui permet de lire le format json des requètes HTTP
  app.use(express.json());

  //  Connexion à la BDD + synchronisation modèles
  await connect();

  // Fixtures
  if (process.env.SEED) runSeed();

  // Middleware de routage
  app.use("/api/mangas", mangaRoutes);

  // Route racine
  app.get("/", (req, res) => {
    res.send("Hello World !");
  });

  // Cloturer la connexion BDD à l'arrêt du serveur
  process.on("SIGINT", async () => {
    console.log("Arrêt du serveur...");
    await sequelize.close();
    console.log("Connexion à la BDD fermée.");
    process.exit(0);
  });
  process.on("SIGTERM", async () => {
    console.log("Arrêt du serveur...");
    await sequelize.close();
    console.log("Connexion à la BDD fermée.");
    process.exit(0);
  });

  return app;
}

/* axios
  .get("https://kitsu.io/api/edge/manga")
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err)); */
