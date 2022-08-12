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

// Timestamp Microservice
app.get("/api/:timestamp?", (req, res) => {
  // Assign the timestamp route parameter to the timeInput variable
  let timeInput = req.params.timestamp;
  // Convert timeInput to a Date object 
  let timeInputToDate = new Date(Number(timeInput));

  // If timeInput is a number and timeInputToDate is not invalid, convert it into unix and utc times and output as JSON.
  if(Number.isInteger(Number(timeInput)) && timeInputToDate != "Invalid Date"){
    res.json({unix: Date.parse(timeInputToDate), "utc": timeInputToDate.toUTCString()});
    // An empty date parameter returns the current time.
  } else if(timeInput === undefined) {
    res.json({unix: Date.parse(new Date()), "utc": new Date().toUTCString()});
    // If the timeInput is not an invalid date, convert it into unix and utc times and output as JSON.
  } else if(new Date(timeInput) != "Invalid Date") {
    res.json({unix: Date.parse(new Date(timeInput)), "utc": new Date(timeInput).toUTCString()})
    // Returns an error if the above conditions can't be met.  
  } else {
    res.json({error : "Invalid Date"});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});