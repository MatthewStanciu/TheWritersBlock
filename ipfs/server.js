// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var IPFS = require('ipfs');
var ipfs = new IPFS({repo: './data/'});
var http = require('http');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.static('app'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/post/:author/n/:title', (req, res) => {
  console.log(req.body);
  ipfs.files.add(Buffer.from(req.body.data), (err, r) => {
    if (err || !r) {
      return console.error('ipfs add error', err, r)
    }

    r.forEach((file) => {
      if (file && file.hash) {
        console.log('successfully stored', file.hash);
        res.send(JSON.stringify({hash: file.hash}));
//         var options = {
//             host: `http://writersblockcentral--physicalcomputi.repl.co/post/${req.params.author}/n/${req.params.title}`,
//             port: 80,
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/x-www-form-urlencoded',
//               'Content-Length': Buffer.byteLength(data)
//             }
//           };

//         var httpreq = http.request(options, function (response) {
//           response.setEncoding('utf8');
//           response.on('data', function (chunk) {
//             console.log("body: " + chunk);
//           });
//           response.on('end', function() {
//             res.send('ok');
//           })
//         });
//         httpreq.write(data);
//         httpreq.end();
      }
    })
  });
  
});

app.post('/v/:hash', (req, res) => {
  ipfs.files.cat(req.params.hash, (err, data) => {
    if (err) { return console.error('ipfs cat error', err) }
    res.send(data);
  })
});

app.get('/post/n', (req, res) => {
  res.sendFile(__dirname + '/views/edit.html');
});

app.get('/err/login', (req, res) => {
  res.sendFile(__dirname + '/views/loginError.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
