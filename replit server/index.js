var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var cheerio = require('cheerio');
var fs = require('fs');

var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('step', (step) => {
    io.emit('step', step);
  });
  socket.on('url', (url) => {
    io.emit('url', url);
  });
  app.get('/demo/reset', (req, res) => {
    io.emit('step', 'reset');
    res.send("done");
  });
});

app.use(express.static('public'));

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/home.html');
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/post/:author/n/:title', (req, res) => {
	fs.readFile('views/home.html', 'utf8', (err, data) => {
		var $ = cheerio.load(data);
		$('#leftcolumn').prepend(
			`<article-list title="${req.params.title}" author="${
				req.params.author
			}" link="${req.body.hash}"></article-list>`
		);
		fs.writeFile('views/home.html', $.html(), () => {
			res.send({});
		});
	});
});

app.get('/post/v', (req, res) => {
	res.sendFile(__dirname + '/views/view.html');
});

app.get('/demo/attention', (req, res) => {
  res.sendFile(__dirname + '/views/drag.html');
});

app.get('/demo/step1', (req, res) => {
  res.sendFile(__dirname + '/views/step1.html')
});

app.get('/demo/step2', (req, res) => {
  res.sendFile(__dirname + '/views/step2.html');
});

app.get('/demo/step3', (req, res) => {
  res.sendFile(__dirname + '/views/step3.html');
});

app.get('/demo/mobile', (req, res) => {
  res.sendFile(__dirname + '/views/mobile.html');
})

http.listen(3000);
