const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.get('/', function(req, res) {
  res.send('Hello World!')
})

app.get('/', function(req, res) {
  res.render('layouts/home', { msg: 'Hello World!'})
})

app.listen(3000, function() {
  console.log('App listening on port 3000!')

})
