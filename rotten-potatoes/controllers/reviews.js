const Review = require('../models/review.js')

function reviews(app) {

  // app.get('/', (req, res) => {
  //   Review.find()
  //     .then(reviews => {
  //       res.render('reviews-index', {reviews: reviews})
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // })

  // SHOW
  app.get('/reviews/:id', (req, res) => {
    // FIND
    Review.findById(req.params.id)
      .then(review => {
        // Fetch its comments
        Comment.find({ reviewId: req.params.id })
          .then(comments => {
            // respon with the template with both values
            res.render('layouts/reviews-show', { review: review, comments: comments })
          })
      }).catch((err) => {
        // Catch erros
        console.log(err.message)
      })
  })

  // GET a review 
  app.get('/movies/:movieId/reviews/new', (req, res) => {
    res.render('layouts/reviews-new', { movieId: req.params.movieId })
  })

  // POST review
  app.post('/movies/:movieId/reviews', (req, res) => {
    console.log(req.body)
  })

}


module.exports = reviews
