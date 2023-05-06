const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// GET movies
router.get('/', (req, res) => {
	// Query to get all movies
	const query = `SELECT * FROM movies ORDER BY "title" ASC`;
	pool.query(query)
		.then(result => {
			res.send(result.rows);
		})
		.catch(err => {
			console.log('ERROR: Get all movies', err);
			res.sendStatus(500)
		})
});

// GET a specific movie
router.get('/details', (req, res) => {
	const movieId = req.query.id
	const queryText = `SELECT * FROM movies 
		JOIN movies_genres ON movies.id = movies_genres.movie_id 
		JOIN genres ON movies_genres.genre_id = genres.id 
		WHERE movie_id=$1`;
	pool.query(queryText, [movieId]).then((result) => {
		res.send(result.rows);
	}).catch((error) => {
		console.log('ERROR: Get this movie', error)
	})
});

// POST
router.post('/', (req, res) => {
	console.log(req.body);
	// RETURNING "id" will give us back the id of the created movie
	const insertMovieQuery = `INSERT INTO "movies" 
		("title", "poster", "description")
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
			});

			// Catch for first query
		}).catch(err => {
			console.log(err);
			res.sendStatus(500)
		});
});

// PUT
router.put('/edit', (req, res) => {
	console.log('In PUT request');
	let updatedMovie = req.body;

	// Query to update movie title and description
	let updateQuery = `UPDATE "movies" 
        SET "title" = $1, "description" = $2
        WHERE "id" = $3;`;
	pool.query(updateQuery,
		[updatedMovie.title, updatedMovie.description, updatedMovie.id])
		.then(() => { })
		.catch((error) => {
			console.log('Error in PUT (update movie)', error);
			res.sendStatus(500);
		});

	// Query to delete movie genres before updating
	let deleteQuery = `DELETE FROM "movies_genres" WHERE movie_id = $1;`
	pool.query(deleteQuery, [updatedMovie.id])
		.then(() => { })
		.catch((error) => {
			console.log('Error in PUT (delete genres)', error);
			res.sendStatus(500);
		});

	// Query to add/update genres of movie
	let updateGenresQuery = `INSERT INTO "movies_genres"
		("movie_id", "genre_id") VALUES ($1, $2);`
	updatedMovie.movieGenres.forEach((genre) => {
		pool.query(updateGenresQuery, [updatedMovie.id, genre.id])
			.then(() => { })
			.catch((error) => {
				console.log('Error in PUT (update genres)', error);
				res.sendStatus(500);
			});
	});
	res.sendStatus(200);
});

// DELETE
router.delete('/:id', (req, res) => {
	console.log('In DELETE request');
	let deletedMovie = req.params.id;

	// Query to remove genres of a specific movie based on movie_id
	let deleteGenresQuery = `DELETE FROM "movies_genres" WHERE "movie_id" = $1;`
	pool.query(deleteGenresQuery, [deletedMovie])
		.then(() => {
			// Query to delete a specific movie based on id
			let deleteMovieQuery = `DELETE FROM "movies" WHERE "id" = $1;`
			pool.query(deleteMovieQuery, [deletedMovie])
			.then(() => {
				res.sendStatus(200);
			})
			.catch((error) => {
				console.log('Error in DELETE', error)
				res.sendStatus(500);
			})
		})
		.catch((error) => {
			console.log('Error in DELETE', error);
			res.sendStatus(500);
		})



})

module.exports = router;