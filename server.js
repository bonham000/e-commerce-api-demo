
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')

var apiRoutes = require('./api-routes');

let app = express();
app.use(bodyParser.json());

app.use(apiRoutes);

// serve homepage
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/index.html'));
});

// serve 404 route
app.get('*', (req, res) => res.send('Page not found T_T'));

var port = process.env.PORT || 7000;

app.listen(port, () => console.log(`Express listening on port ${port}`));