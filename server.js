
var express = require('express');
var bodyParser = require('body-parser')

var orders = require('./api/orders.js');

var printPrices = require('./api/methods').printPrices;
var allocateFunds = require('./api/methods').allocateFunds;

let app = express();

// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.use(bodyParser.json());

// demo routes which preload json data
// demo order prices:
app.get('/api/get-prices', (req, res) => {
	res.json(printPrices(orders));
});
// demo fund distributions:
app.get('/api/get-funds', (req, res) => {
	res.send(allocateFunds(orders));
});

// actual api-routes, must post order data
// post for prices:
app.post('/api/post-prices/', (req, res) => {
	res.json(printPrices(req.body));
});

// post for fund distributions:
app.post('/api/post-funds', (req, res) => {
	res.send({ data: allocateFunds(req.body) });
});

// serve homepage
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/client/index.html');
});

// serve 404 route
app.get('*', (req, res) => res.send('Page not found T_T'));

app.listen(7000, () => console.log('Express listening on port 7000'));