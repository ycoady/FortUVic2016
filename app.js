/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

var bodyParser = require('body-parser');

// create a new express server
var app = express();

//var busboy = require('connect-busboy'); //middleware for form/file upload
//var path = require('path');     //used for file path
//var fs = require('fs-extra');       //File System - for file manipulation

//app.use(busboy());
//app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


var quotes = [
  { author : 'Audrey Hepburn', text : "Nothing is impossible, the word itself says 'I'm possible'!"},
  { author : 'Walt Disney', text : "You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you"},
  { author : 'Unknown', text : "Even the greatest was once a beginner. Don't be afraid to take that first step."},
  { author : 'Neale Donald Walsch', text : "You are afraid to die, and you're afraid to live. What a way to exist."}
];

var myPage =
'<!DOCTYPE html><html><body><h1>Hello! WELCOME to your FULL STACK!!!!!</h1><form action="https://ourquotes.mybluemix.net/quote" method="post"> <input type="text" name="author" value="Mickey" /> <input type="text" name="text" value="Mickey" />  <input type="submit" /></form></body></html>';

app.get('/', function(req, res) {
  console.log("==> / GET");
  res.json(quotes);
});

app.get('/quote/random', function(req, res) {
  console.log("==> /quote/random GET");
  var id = Math.floor(Math.random() * quotes.length);
  var q = quotes[id];
  res.json(q);
});

app.get('/quote/:id', function(req, res) {
  console.log("==> /quote/id!");
  if(quotes.length <= req.params.id || req.params.id < 0) {
    res.statusCode = 404;
    return res.send('Error 404: No quote found');
  }
  var q = quotes[req.params.id];
  res.json(q);
});

app.get('/addMine', function(req, res) {
  console.log("==> / GET mine!");
  res.send(myPage);
});


app.post('/quote', function(req, res) {
 console.log("==> post!!! "  );

  if(typeof req.body.author === 'undefined' ||
    typeof req.body.text === 'undefined') {
   res.statusCode = 400;
   return res.send('Error 400: Post syntax incorrect.');
 }

  var newQuote = {
    author : req.body.author,
    text : req.body.text
  };

  quotes.push(newQuote);
  res.json(req.body);
});

/*
app.post("/upload", function(req, res) {
    if(req.busboy) {
        req.busboy.on("file", function(fieldName, fileStream, fileName, encoding, mimeType) {
            //Handle file stream here
            console.log("made it here!");
        });
        return req.pipe(req.busboy);
    }
    //Something went wrong -- busboy was not loaded
});
*/
 

// start server on the specified port and binding host
app.listen(process.env.VCAP_APP_PORT || 8080, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + process.env.url);
});

