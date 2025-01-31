// index.js
// where your node app starts

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

app.get("/api/:date?",function(req, res){
  const dateString = req.params.date;
  let response = {};

  // If no date is provided, use the current date
  if (!dateString) {
    const now = new Date();
    response.unix = now.getTime();
    response.utc = now.toUTCString();
  } else {
    let date;
    // If the date is a valid Unix timestamp
    if (!isNaN(dateString)) {
      date = new Date(parseInt(dateString));
    } 
    // If it's a valid date string
    else {
      date = new Date(dateString);
    }

    // If the date is invalid, return an error message
    if (date.toString() === "Invalid Date") {
      return res.json({ error: "Invalid Date" });
    }

    // If the date is valid, return both Unix and UTC
    response.unix = date.getTime();
    response.utc = date.toUTCString();
  }

  res.json(response);
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
