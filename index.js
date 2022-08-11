// index.js
// where your node app starts
require('dotenv').config()

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//
app.get("/api/:timestamp?", (req, res) => {
  let unixTime = req.params.timestamp;
  let utcTime = req.params.timestamp;
  let timeInput = req.params.timestamp;

  console.log(req.params.timestamp)
  console.log(new Date(timeInput))

  if(Number.isInteger(Number(timeInput)) && new Date(timeInput) != "Invalid Date"){
    res.json({unix: Date.parse(new Date(Number(timeInput))), "utc": new Date(Number(timeInput)).toUTCString()});
  } else if(timeInput === undefined) {
    res.json({unix: Date.parse(new Date()), "utc": new Date().toUTCString()});
  } else if(new Date(timeInput) != "Invalid Date") {
    res.json({unix: Date.parse(new Date(timeInput)), "utc": new Date(timeInput).toUTCString()})
  } else {
    res.json({error : "Invalid Date"});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});