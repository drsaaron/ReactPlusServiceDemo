// server/index.js

const path = require('path');
const express = require("express");
const axios = require('axios');
const config = require('config');

const PORT = config.get('SERVER_PORT');
const API_PORT = config.get('API_PORT');
const API_HOST = config.get('API_HOST');

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
    // call the API server
    //  res.json({ message: "Hello from server!" });
    axios.get(API_HOST + ":" + API_PORT + "/api")
	.then(response => {
	    console.log("response = " + Object.keys(response));
	    return res.json(response.data);
	}) ;
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
