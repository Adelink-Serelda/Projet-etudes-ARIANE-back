const express = require("express");
const path = require("path");
const axios = require("axios");
const app = express();

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello World !");
});

app.listen(port, () => {
  console.log(`Le serveur est démarré sur http://localhost:${port}`);
});

axios
  .get("https://kitsu.io/api/edge/manga")
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err));
