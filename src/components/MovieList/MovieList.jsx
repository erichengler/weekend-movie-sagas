import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
// ------- MUI Imports -------
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

function MovieList() {

    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    // GET movies and genres from database
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);
    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' });
    }, []);

    // Takes user to details of the movie that was clicked on
    const toDetails = (id) => {
        history.push(`/details/${id}`);
    }

    return (
        <>
            <Typography variant="h4">Movie List</Typography>
            <p><i>- Click on a poster to view movie details -</i></p>
            <Container maxWidth='xl'>
                <Grid container spacing={0} justifyContent='center'>
                        {movies.map(movie => {
                            return (
                                <Grid item sx={{ mx: '20px', my: '20px' }}>
                                    <Card key={movie.id} variant="outlined"
                                        sx={{ width: 320, maxWidth: 320, 
                                            height: 432, maxHeight: 432,
                                            backgroundColor: 'rgba(166,43,31,0.2)',
                                            border: '1px solid black' }}
                                    >
                                        <Typography variant="h6" sx={{ my: '10px' }}>
                                            {movie.title}                         
                                        </Typography>
                                        <img src={movie.poster} alt={movie.title}
                                            onClick={() => toDetails(movie.id)}
                                            className="movieImages"
                                        />
                                    </Card>
                                </Grid>
                            );
                        })}
                </Grid>
            </Container>
            <br />
        </>
    );
}

export default MovieList;