import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// ------- MUI Imports -------
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

function MovieDetails() {

    // GET this movie on load
    useEffect(() => {
        dispatch({ type: 'FETCH_THIS_MOVIE', payload: id });
    }, []);

    // Takes the id from the url
    let { id } = useParams();

    let history = useHistory();
    let dispatch = useDispatch();

    // Storing current movie
    const movie = useSelector((store) => store.thisMovie);

    // Brings user back to movie list view
    const backToList = () => {
        history.push('/')
    }

    // Brings user to edit details page
    const toEditDetails = () => {
        history.push(`/edit/${id}`)
    }

    // Deletes a movie from the database
    const deleteMovie = () => {
        if (window.confirm("Are you sure you want to delete this movie?")) {
            dispatch({ type: 'REMOVE_MOVIE', payload: id });
            history.push('/')
        }
    }

    return (
        <div>
            {/* Checking if reducer has a value before loading */}
            {movie.length === 0 || movie.genres.length === 0 ? (
                <h3>Loading...</h3>
            ) : (
                <div>

                    {/* Header */}
                    <Typography variant="h4">
                        Movie Details
                    </Typography>
                    <br />

                    <Grid container justifyContent='center'>

                        {/* Card containing details */}
                        <Card variant="outlined" sx={{
                            width: '900px', height: '593px', boxShadow: 4,
                            backgroundColor: 'rgba(166,43,31,0.2)',
                            marginBottom: '10px', overflowY: 'auto',
                            minWidth: '560px'
                        }}>
                            <br />

                            {/* Grid containing movie image and information */}
                            <Grid container>

                                {/* Movie Poster Image */}
                                <Grid item xs={5}>
                                    <CardMedia sx={{
                                        marginLeft: '30px', marginTop: '10px',
                                        height: '535px', maxWidth: '100%',
                                    }}
                                        image={movie.movie.poster}
                                        title={movie.movie.title}
                                    >
                                    </CardMedia>
                                </Grid>

                                {/* Movie Information */}
                                <Grid item xs={6}>
                                    <CardContent sx={{
                                        textAlign: 'left', marginTop: '-10px',
                                        marginRight: '-65px',
                                    }}>

                                        {/* Title */}
                                        <Typography variant="h5">
                                            <u>{movie.movie.title}</u>
                                        </Typography>

                                        {/* Genres */}
                                        <Typography>
                                            {
                                                movie.genres.map(genre => {
                                                    return <span key={genre.id}>
                                                        <i>•&nbsp;{genre.name}&nbsp;</i>
                                                    </span>
                                                })
                                            }
                                        </Typography>
                                        <br />

                                        {/* Description */}
                                        <Typography fontSize='medium'>
                                            {movie.movie.description}
                                        </Typography>
                                    </CardContent>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>

                    {/* Buttons */}
                    <Button onClick={toEditDetails}
                        sx={{ color: '#A62B1F', marginRight: '15px' }}
                    >
                        Edit Details
                    </Button>
                    |
                    <Button onClick={deleteMovie}
                        sx={{ color: '#A62B1F', marginRight: '15px', marginLeft: '15px' }}
                    >
                        Delete Movie
                    </Button>
                    |
                    <Button onClick={backToList}
                        sx={{ color: '#A62B1F', marginLeft: '15px' }}
                    >
                        Back to List
                    </Button>
                </div>
            )}
        </div>
    )
}

export default MovieDetails;