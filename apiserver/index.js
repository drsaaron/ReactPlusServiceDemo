// server/index.js

const path = require('path');
const express = require("express");
const config = require('config');

const PORT = config.get('API_PORT');

const app = express();

app.get("/api", (req, res) => {
    console.log("got request");
  res.json({ message: "Hello from API server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
