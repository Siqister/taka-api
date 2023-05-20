const express = require('express');
const router = express.Router();

const sensorData = [];
const MAX_READINGS = 10; // store up to 10 readings

// updates from Arduino arrive via POST /update payload
router.post('/', (req, res) => {

	console.log('POST /update');

	try{
		const { pm25, pm10, t } = req.body;

		// log values in in-memory data store, up to 10 readings
		// TODO: in-memory data store is lost when dyno restarts
		sensorData.push({ pm25, pm10, t });
		if(sensorData.length > MAX_READINGS){
			sensorData.shift();
		}

		res.status(200).json({ status: 'OK' });

	}catch(err){
		console.log(err);
	}
});

router.get('/', (req, res) => {
	console.log(sensorData);
	res.json(sensorData[sensorData.length - 1]);
});

// streaming endpoint for serving the data
// router.get('/', (req, res) => {
// 	res.setHeader('Content-Type', 'text/event-stream');
// 	res.setHeader('Cache-Control', 'no-cache');

// 	const intervalId = setInterval(() => {
// 		if(sensorData.length > 0){
// 			res.write(`data: ${JSON.stringify(sensorData[-1])}\n\n`);
// 		}
// 	}, 5000);

// 	// End the stream when the client disconnects
// 	req.on('close', () => {
// 		clearInterval(intervalId);
// 		res.end();
// 	})
// });

module.exports = router;