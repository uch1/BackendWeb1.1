var express = require('express');
var app = express();

var exphbs = require('express-handlebars');
var http = require('http');
var giphy = require('giphy-api')();

app.get('/hello-world', function(req, res) {
  var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif';
  res.render('hello-gif', {gifUrl: gifUrl});
});

app.get('/greetings/:name', function(req, res) {
  var name = req.params.name;
  res.render('greetings', {name: name});
});
//
// app.get('/', function(req, res) {
//   console.log(req.query);
//   res.render('layouts/home');
// });

app.get('/', function(req, res) {
  console.log(req.query.term);

  var queryString = req.query.term;
  console.log('Debugging' + queryString)
  // Encode the query string to remove white spaces and restricted characters
  var term = encodeURIComponent(queryString);
  // Put the search term into the giphy api search url
  var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC'

  http.get(url, function(response) {
    console.log('In here');
    response.setEncoding('utf8');

    var body = '';

    response.on('data', function(data) {
      body += data;

    });
    console.log('Body Data' + body);
    response.on('end', function() {
      var parsed = JSON.parse(body);
      console.log(parsed.data)
      res.render('layouts/home', {gifs: parsed.data});
    });

  });

});

// app.get('/', function(req, res) {
//   giphy.search(req.query.term, function (err, response) {
//     res.render('layouts/home', {gifs: response.data});
//   });
// });

app.listen(3000, function() {
  console.log('Gif Search listening on port localhost:3000!');
});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
