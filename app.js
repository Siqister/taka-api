const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const sensorRoute = require('./routes/sensor');

// app logic
app.get('/', (req, res) => {
	res.send('Taka hello');
});

app.use('/sensor', sensorRoute);

module.exports = app;