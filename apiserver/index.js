// server/index.js

const path = require('path');
const express = require("express");
const config = require('config');
const fs = require('fs');
const http = require('http');
const https = require('https');

const PORT = config.get('API_PORT');
const SSL_PORT = config.get('API_HTTPS_PORT');

var privateKey = fs.readFileSync('key.pem');
var certificate = fs.readFileSync('cert.pem');

var credentials = {key: privateKey, cert: certificate};

const app = express();

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

app.get("/api", (req, res) => {
    console.log("got request");
    var message = req.query.message;
    res.json({ message: "Hello " + message + " from API server!" });
});

app.get("/api/person/:personId", (req, res) => {
    var personId = req.params.personId;
    res.json({ message: "got personID " + personId });
});

httpsServer.listen(SSL_PORT, () => { console.log(`API server listening on port ${SSL_PORT} (https)`)});
