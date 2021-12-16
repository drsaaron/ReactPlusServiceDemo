// server/index.js

const path = require('path');
const express = require("express");
const axios = require('axios');

const PORT = process.env.PORT || 3001;
const API_PORT = process.env.API_PORT || 3002;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
    // call the API server
    //  res.json({ message: "Hello from server!" });
    axios.get("http://localhost:" + API_PORT + "/api")
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
