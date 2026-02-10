/* 
Type: commonjs
const express = require("express");
const path = require("path");
const axios = require("axios"); */

import express from "express";
import path from "path";
import axios from "axios";
import { connect } from "./config/database.js";
import mangaRoutes from "./routes/manga.routes.js";

export async function initApp() {
  const app = express();

  app.use(express.json());

  //  Connexion à la BDD + synchronisation modèles
  await connect();

  // Routes
  app.use("/api/mangas", mangaRoutes);

  // Route racine
  app.get("/", (req, res) => {
    res.send("Hello World !");
  });

  return app;
}

/* axios
  .get("https://kitsu.io/api/edge/manga")
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err)); */
