
var express = require('express');
var bodyParser = require('body-parser')

var apiRoutes = require('./api-routes');

let app = express();
app.use(bodyParser.json());

app.use(apiRoutes);

// serve homepage
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/client/index.html');
});

// serve 404 route
app.get('*', (req, res) => res.send('Page not found T_T'));

app.listen(process.env.port || 7000, () => console.log('Express listening on port 7000'));