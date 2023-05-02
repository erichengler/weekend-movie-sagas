import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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

    // GET movies from database
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    // Takes user to details of the movie that was clicked on
    const toDetails = (id) => {
        history.push(`/details/${id}`);
    }

    return (
        <Container maxWidth='xl'>
            <Typography variant="h4">
                Movie List
            </Typography>
            <Typography>
                <i>Click on a poster to view movie details</i>
            </Typography>
            <br />
            <Grid container spacing={0} justifyContent='center'>
                {movies.map(movie => {
                    return (
                        <Grid key={movie.id} 
                            item sx={{ mx: '20px', my: '20px' }}
                        >
                            <Card variant="outlined"
                                sx={{
                                    width: 320, maxWidth: 320,
                                    height: 445, maxHeight: 445,
                                    backgroundColor: 'rgba(166,43,31,0.2)',
                                    boxShadow: 4
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" >
                                        {movie.title}
                                    </Typography>
                                </CardContent>
                                <CardMedia sx={{
                                    cursor: 'pointer', margin: 'auto',
                                    width: '240px', height: '355px'
                                }}
                                    image={movie.poster} title={movie.title}
                                    onClick={() => toDetails(movie.id)}
                                >
                                </CardMedia>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            <br />
        </Container>

    );
}

export default MovieList;