'use strict';

const express = require('express');
const KafkaService = require('./producer');

const PORT = 8080;
const HOST = 'localhost';

const app = express();
app.get('/produce', (req, res) => {
    res.send('Hello cunt, producing messages...');
    KafkaService()
});

app.listen(PORT, HOST);
console.log(`Running on ${HOST}:${PORT}`);