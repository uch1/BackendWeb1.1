// PROPERTIES



const express = require('express')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')

const reviews = require('./controllers/reviews.js')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true })

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


const Review = require('./models/review')
const Comment = require('./models/comment')

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
    res.redirect(`/reviews/${review._id}`)
  }).catch((err) => {
    console.log(err.message)
  })
  // res.render('reviews-new', {})
})

// SHOW
app.get('/reviews/:id', (req, res) => {
  Review.findById(req.param.id)
    .then((review) => {
      res.render('layouts/reviews-show', {review: review})
    }).catch((err) => {
      console.log(err.message)
    })
})

// EDIT
app.get('/reviews/:id/edit', (req, res) => {
  Review.findById(red.params.id)
    .then((review) => {
      res.render('layouts/reviews-edit', {review: review})
    }).catch((err) => {
      console.log(err.message)
    })
})

//UPDATE
app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})

// DELETE
app.delete('/reviews/:id', (req, res) => {
  console.log("DELETE review")
  Review.findByIdAndRemove(req.params.id)
    .then((review) => {
      res.redirect('/')
    }).catch((err) => {
      console.log(err.message)
    })
})

// METHODS

// comments.js
app.post('/reviews/comments', (req, res) => {
  Comment.create(req.body)
    .then(comment => {
      res.redirect(`/reviews/${comment.reviewId}`)
    }).catch((err) => {
      console.log(err.message)
    })
})

app.delete('reviews/comments/:id', (req, res) => {
  console.log("DELETE comment")
  Comment.findByIdAndRemove(req.params.id)
    .then((comment) => {
      res.redirect(`/reviews/${comment.reviewId}`)
    }).catch((err) => {
      console.log(err.message)
    })
})

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

module.export = app
