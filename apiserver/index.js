// server/index.js

const path = require('path');
const express = require("express");

const PORT = process.env.API_PORT || 3002;

const app = express();

app.get("/api", (req, res) => {
    console.log("got request");
  res.json({ message: "Hello from API server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
