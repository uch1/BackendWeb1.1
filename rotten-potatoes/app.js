// PROPERTIES

const express = require('express')
const exphbs = require('express-handlebars')

const bodyParser = require('body-parser')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true })

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
})

// let reviews = [
//   { title: "Uchenna is the best book ever",
//     movieTitle: "Uchenna"
//   },
//   { title: "I like cookies",
//     movieTitle: "cookies"
//   },
//   { title: "MacBook Pro",
//     movieTitle: "MacBook Air"
//   }
// ]

// INDEX
app.get('/', function(req, res) {
  Review.find()
    .then(reviews => {
      res.render('layouts/reviews-index', { reviews: reviews })
    })
    .catch(err => {
      console.log(err)
    });
})

// NEW
app.get('/reviews/new', function(req, res) {
  res.render('layouts/reviews-new', {})
})

// CREATE
app.post('/reviews', function(req, res) {
  console.log(req.body)

  Review.create(req.body).then((review) => {
    console.log(review)
    res.redirect('/')
  }).catch((err) => {
    console.log(err.message)
  })
  // res.render('reviews-new', {})
})

// METHODS

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// app.get('/', function(req, res) {
//   res.send('Hello World!')
// })

// app.get('/', function(req, res) {
//   res.render('layouts/home', { msg: 'Hello World!'})
// })

app.listen(3000, function() {
  console.log('App listening on port 3000!')

})
