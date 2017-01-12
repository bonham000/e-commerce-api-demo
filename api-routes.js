
var express = require('express');

var orders = require('./api/orders.js');
var printPrices = require('./api/methods').printPrices;
var allocateFunds = require('./api/methods').allocateFunds;

var router = express();

// demo routes which preload json data
// demo order prices:
router.get('/api/get-prices', (req, res) => {
	res.json(printPrices(orders));
});
// demo fund distributions:
router.get('/api/get-funds', (req, res) => {
	res.json(allocateFunds(orders));
});

// actual api-routes, must post order data
// post for prices:
router.post('/api/post-prices/', (req, res) => {
	try {
		var result = printPrices(req.body);
		res.json(result);
	} catch(err) {
		console.log('Post data to prices API failed.');
		res.status(500).send();
	};
});

// post for fund distributions:
router.post('/api/post-funds', (req, res) => {
	try {
		var result = allocateFunds(req.body);
		res.json(result);
	} catch(err) {
		console.log('Post data to funds API failed.');
		res.status(500).send();
	};
});

module.exports = router;