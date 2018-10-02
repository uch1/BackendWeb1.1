
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









    
}






