import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios';
// ------- MUI Imports -------
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

function MovieDetails() {

    let { id } = useParams();
    let history = useHistory();
    let dispatch = useDispatch();

    const movies = useSelector(store => store.movies);
    const genresForMovie = useSelector(store => store.genresForMovie)

    // Brings user back to movie list view
    const backToList = () => {
        history.push('/')
    }

    // GET genres of specific movie based on id
    const getGenresForMovie = () => {
        console.log('In getGenreForMovie', genresForMovie);
        axios.get(`/api/movie/${movies[id - 1].id}`).then((response) => {
            dispatch({ type: 'SET_GENRES_FOR_MOVIE', payload: response.data });
        }).catch(error => {
            alert('Something went wrong!');
        })
    }

    useEffect(() => {
        getGenresForMovie();
    }, [])

    return (
        <Container>
            <Typography variant="h4">
                Movie Details
            </Typography>
            <br />
            <Grid container spacing={0} justifyContent='center'>
                <Card variant="outlined" sx={{
                    width: '900px', height: '593px', boxShadow: 4,
                    backgroundColor: 'rgba(166,43,31,0.2)',
                    marginBottom: '10px'
                }}>
                    <br />
                    <Grid container>
                        {/* Movie Poster Image */}
                        <Grid item xs={5}>
                            <CardMedia sx={{
                                marginLeft: '30px', marginTop: '10px',
                                height: '535px'
                            }}
                                image={movies[id - 1].poster}
                                title={movies[id - 1].title}
                            >
                            </CardMedia>
                        </Grid>
                        {/* Title, genres and description */}
                        <Grid item xs={6}>
                            <CardContent sx={{ 
                                textAlign: 'left', marginTop: '-10px',
                                marginRight: '-65px' }}
                            >
                                <Typography variant="h5">
                                    <u>{movies[id - 1].title}</u>
                                </Typography>
                                <Typography>
                                    {
                                        genresForMovie.map(genre => {
                                            return <span key={genre.id}>
                                                <i>•&nbsp;{genre.name}&nbsp;</i>
                                            </span>
                                        })
                                    }
                                </Typography>
                                <br />
                                <Typography fontSize='medium'>
                                    {movies[id - 1].description}
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Button sx={{ color: '#A62B1F' }} onClick={backToList}>
                Back to List
            </Button>
            <br /><br />
        </Container>
    )
}

export default MovieDetails;