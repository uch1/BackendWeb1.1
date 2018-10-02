
// movies.js 
const MovieDB = require('moviedb-promise')
const moviedb = new MovieDB('b422d91de0edd80e88881c51dcd33a04')

function movies(app) {

    // GET all movies
    app.get('/movies', (req, res) => {
        moviedb.miscNowPlayingMovies()
            .then(movies => {
                moviedb.genreMovieList().then(genres => {
                    res.render('layouts/movies-index', { movies: movies.results, genres: genres })
                })
            })
            .catch(console.error)
    })

    // GET one movie
    app.get('/movies/:id', (req, res) => {
        moviedb.movieInfo({id: req.params.id})
        .then(movie => {
            if (movie.video) {
                 moviedb.movieVideos({ id: req.params.id })
                .then(videos => {
                      movie.trailer_youtube_id = videos.results[0].key
                      renderTemplate(movie)   
                 })        
            } else {
                renderTemplate(movie)
            }

            function renderTemplate(movie) {
                res.render('layouts/movies-show', { movie: movie })
            }    
        })
        .catch(console.error)
    })

    // GET (SHOW) movie trailers 
    app.get('movies/:id', (req, res) => {
        moviedb.movieInfo({ id: req.params.id }).then(movie => {
            moviedb.movieTrailers({ id: req.params.id }).then(videos => {
                movie.trailer_youtube_id = videos.youtube[0].source
                console.log('VIDEOS.TRAILER_YOUTUBE_ID', videos.trailer_youtube_id)

                res.render('layouts/movies-show', { movie: movie })
            }).catch(console.error)
        }).catch(console.error)
    })

    // SHOW 
    app.get('/movies/:id', (req, res) => {
        moviedb.movieInfo({ id: req.params.id }).then(movie => {
            // FIND THIS MOVIE'S REVIEWS 
            Review.find({ movieId: req.params.id }).then(reviews => {
                // THEN RENDER THE MOVIES-SHOW TEMPLATE 
                res.render('layouts/movies-show', { movie: movie, reviews: reviews })
            }).catch(console.error)
        }).catch(console.error)
    })





    
}






