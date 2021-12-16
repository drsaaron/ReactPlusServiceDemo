// server/index.js

const path = require('path');
const express = require("express");
const axios = require('axios');
const config = require('config');
const fs = require('fs');
const http = require('http');
const https = require('https');

const PORT = config.get('SERVER_PORT');
const API_PORT = config.get('API_HTTPS_PORT');
const API_HOST = config.get('API_HOST');
const SSL_PORT = config.get('SERVER_HTTPS_PORT');

var privateKey = fs.readFileSync('key.pem');
var certificate = fs.readFileSync('cert.pem');

var credentials = {key: privateKey, cert: certificate};

const app = express();

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
    // call the API server
    //  res.json({ message: "Hello from server!" });
    const httpsAgent = new https.Agent({
	rejectUnauthorized: false, // (NOTE: this will disable client verification)
	cert: certificate,
	key: privateKey
    });
    axios.get(API_HOST + ":" + API_PORT + "/api", {httpsAgent})
	.then(response => {
	    console.log("response = " + Object.keys(response));
	    return res.json(response.data);
	}) ;
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

httpsServer.listen(SSL_PORT, () => { console.log(`Application server listening on port ${SSL_PORT} (https)`)});
