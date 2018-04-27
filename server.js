/*var express = require('express');
 var app = express();

 app.use(express.static("public"));

 app.post('/create-post', function (req, res) {
 res.send('Hello there!');
 console.log('/create-post')
 });

 app.listen(3000, function() {
 console.log('Server is listening on port 3000, Ready to accept requests!')
 });*/

var express = require("express");
	fs = require('fs');
	mustacheExpress = require('mustache-express');

var app = express();

app.use(express.static("public"));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

app.listen(3000, function () {
	console.log("Server is listening on port 3000. Ready to accept requests!");
});
