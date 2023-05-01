const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// GET movies
router.get('/', (req, res) => {
  // Query to get all movies
  const query = `SELECT * FROM movies ORDER BY "id" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })
});

// GET genres for specific movie
router.get('/:id', (req, res) => {
  // Query to get genres of a specific movie based on id
  let movieId = req.params.id
  const queryText = `SELECT genres.name FROM genres
    JOIN movies_genres ON genres.id = movies_genres.genre_id
    JOIN movies ON movies_genres.movie_id = movies.id
    WHERE movies.id = $1`;
  pool.query(queryText, [movieId]).then(result => {
    res.send(result.rows);
  }).catch(err => {
    console.log('ERROR: Get genres', err);
    res.sendStatus(500)
  })
});

// POST
router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

// PUT
router.put('/', (req, res) => {
  console.log('In PUT request');
  let updatedMovie = req.body;

  let queryText = `UPDATE "movies" 
                  SET "title" = $1, "description" = $2
                  WHERE "id" = $3;`;

  pool.query( queryText, 
    [updatedMovie.title, updatedMovie.description, updatedMovie.id] )
    .then(() => { res.sendStatus(200); })
    .catch((error) => {
      console.log('Error in PUT', error);
      res.sendStatus(500);
    })
})

module.exports = router;