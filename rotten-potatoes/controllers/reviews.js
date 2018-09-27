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

}


module.exports = reviews
