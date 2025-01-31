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

app.get("/api/:date",function(req, res){
  const dateString = req.params.date_string;
  let response = {};

  // If no date is provided, use the current date
  if (!dateString) {
    response.unix = new Date().getTime();
    response.utc = new Date().toUTCString();
  } else {
    // If dateString is a valid timestamp
    if (!isNaN(dateString)) {
      let date = new Date(parseInt(dateString));
      response.unix = date.getTime();
      response.utc = date.toUTCString();
    } 
    // If it's a valid date string
    else {
      let date = new Date(dateString);
      if (date.toString() === "Invalid Date") {
        return res.json({ error: "Invalid Date" });
      }
      response.unix = date.getTime();
      response.utc = date.toUTCString();
    }
  }
  res.json(response);
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
