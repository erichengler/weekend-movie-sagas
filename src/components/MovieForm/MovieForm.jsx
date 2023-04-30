import { useHistory } from "react-router-dom";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// MUI Imports
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

// ------- START of TextField CSS -------
const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#A62B1F',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'grey',
        },
        '&:hover fieldset': {
            borderColor: 'black',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#A62B1F',
        },
    },
});
// ------- END of TextField CSS -------

function MovieForm() {

    let [newMovie, setMovie] = useState({
        title: '', poster: '', description: '', genre_id: '1'
    })

    const dispatch = useDispatch();
    const history = useHistory();

    // Brings user back to movie list view
    const backToList = (event) => {
        event.preventDefault();
        history.push('/')
    }

    // --------- START of handleChange ---------
    const handleTitleChange = (event) => {
        setMovie({ ...newMovie, title: event.target.value });
    }
    const handlePosterChange = (event) => {
        setMovie({ ...newMovie, poster: event.target.value });
    }
    const handleDescChange = (event) => {
        setMovie({ ...newMovie, description: event.target.value });
    }
    const handleGenreChange = (event) => {
        setMovie({ ...newMovie, genre_id: event.target.value });
    }
    // --------- END of handleChange ---------

    // Adds movie to the database and returns user to movie list view
    const addMovie = (event) => {
        if ( (newMovie.description).length < 1160 ) {
            event.preventDefault();
            dispatch({ type: 'ADD_MOVIE', payload: newMovie, setMovie: setMovie });
            setMovie({ title: '', poster: '', description: '', genre_id: '' });
            history.push('/');
        } else {
            event.preventDefault();
            alert('Your movie description is a bit too long! (Max: 1160 characters)')
        }
    }

    return (
        <>
            <Typography variant="h4">
                Add Movie
            </Typography>
            <br />
            <form onSubmit={addMovie} autoComplete="off">
                {/* Title Input */}
                <CssTextField
                    className="input"
                    placeholder="Movie Title"
                    required onChange={handleTitleChange}
                />
                <br /><br />
                {/* Image URL Input */}
                <CssTextField
                    placeholder="Poster Image URL"
                    required onChange={handlePosterChange}
                />
                <br /><br />
                {/* Description Input */}
                <CssTextField 
                    placeholder="Movie Description"
                    rows="5" multiline required
                    onChange={handleDescChange}
                />
                {/* Genre Select */}
                <h4>Select Genre:</h4>
                <CssTextField select onChange={handleGenreChange}
                    defaultValue="1"
                >
                    <MenuItem value="1">Adventure</MenuItem>
                    <MenuItem value="2">Animated</MenuItem>
                    <MenuItem value="3">Biographical</MenuItem>
                    <MenuItem value="4">Comedy</MenuItem>
                    <MenuItem value="5">Disaster</MenuItem>
                    <MenuItem value="6">Drama</MenuItem>
                    <MenuItem value="7">Epic</MenuItem>
                    <MenuItem value="8">Fantasy</MenuItem>
                    <MenuItem value="9">Musical</MenuItem>
                    <MenuItem value="10">Romantic</MenuItem>
                    <MenuItem value="11">Science Fiction</MenuItem>
                    <MenuItem value="12">Space-Opera</MenuItem>
                    <MenuItem value="13">Superhero</MenuItem>
                </CssTextField>
                <br /><br />
                {/* Buttons */}
                <Button type="submit"
                    sx={{ color: '#A62B1F', marginRight: '15px' }}
                >
                    Save
                </Button>
                |
                <Button onClick={backToList}
                    sx={{ color: '#A62B1F', marginLeft: '15px' }}
                >
                    Cancel
                </Button>
            </form>
        </>
    );
}

export default MovieForm;


