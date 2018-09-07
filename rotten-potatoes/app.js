// PROPERTIES

const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

let reviews = [
  { title: "Uchenna is the best book ever",
    movieTitle: "Uchenna"
  },
  { title: "I like cookies",
    movieTitle: "cookies"
  }
]

// INDEX
app.get('/', function(req, res) {
  res.render('layouts/reviews-index', { reviews: reviews })
})

// METHODS

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.get('/', function(req, res) {
  res.send('Hello World!')
})

// app.get('/', function(req, res) {
//   res.render('layouts/home', { msg: 'Hello World!'})
// })

app.listen(3000, function() {
  console.log('App listening on port 3000!')

})
