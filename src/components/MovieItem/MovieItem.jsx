import React from 'react';
import { useHistory } from 'react-router-dom';
// ------- MUI Imports -------
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function MovieItem({ movie }) {

    const history = useHistory();

    // Takes user to details of the movie that was clicked on
    const toDetails = () => {
        history.push(`/details/${movie.id}`);
    }

    return (
        <Grid item sx={{ mx: '20px', my: '20px' }} >
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
                    onClick={toDetails}
                >
                </CardMedia>
            </Card>
        </Grid>
    );
}

export default MovieItem;