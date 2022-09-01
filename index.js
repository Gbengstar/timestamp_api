// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/:date?', (req, res) => {
  const { date } = req.params;
  if (!date)
    return res.json({
      unix: new Date(Date.now()).getTime(),
      utc: new Date(Date.now()).toUTCString(),
    });
  if (date * 0 === 0) {
    const api = new Date(date * 1);
    return res.json({ unix: api.getTime(), utc: api.toUTCString() });
  }
  const api = new Date(date);
  if (!api.getTime()) return res.json({ error: 'Invalid Date' });
  res.json({ unix: api.getTime(), utc: api.toUTCString() });
});

// listen for requests :)
var listener = app.listen(4500 || process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
