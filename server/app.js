var express = require('express');
var app = express();
var index = require('./routes/index');
var path = require('path');
var bodyParser = require('body-parser');

// static pages
app.use(express.static(path.join(__dirname, './public')));

// used for post
app.use(bodyParser.urlencoded({
    extended: true
}));

// used for post
app.use(bodyParser.json());

// route the request to index.js
app.use('/', index);

// set server port
app.set("port", process.env.PORT || 5000);

// run the server
app.listen(app.get("port"), function(){
    console.log("Listening on: ", app.get("port"));
});

module.exports = app;