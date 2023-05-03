import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieItem from '../MovieItem/MovieItem';
// ------- MUI Imports -------
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

function MovieList() {

    // GET all movies and genres from database
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({ type: 'FETCH_GENRES' });
    }, []);

    // Storing all movies and genres
    const movies = useSelector(store => store.movies);
    const genres = useSelector(store => store.genres);

    const dispatch = useDispatch();

    return (
        <Container maxWidth='xl'>

            {/* Header */}
            <Typography variant="h4">
                Movie List
            </Typography>

            {/* Instructions */}
            <Typography>
                <i>Click on a poster to view movie details</i>
            </Typography>
            <br />

            {/* Display all genres */}
            <Typography>

                {/* Maps through all genres */}
                {genres.map(genre => {
                    if (genre.id === genres.length) {
                        return `${genre.name}`;
                    } else {
                        return `${genre.name} • `;
                    }
                })}
            </Typography>
            <br />

            {/* Grid containing movie cards */}
            <Grid container spacing={0} justifyContent='center'>

                {/* Maps through all movies */}
                {movies.map((movie) => (
                    <MovieItem key={movie.id} movie={movie} />            
                ))}
            </Grid>
            <br />
        </Container>

    );
}

export default MovieList;