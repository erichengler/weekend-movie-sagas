import { useHistory } from "react-router-dom";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// ------- MUI Imports -------
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

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
            event.preventDefault();
            dispatch({ type: 'ADD_MOVIE', payload: newMovie, setMovie: setMovie });
            setMovie({ title: '', poster: '', description: '', genre_id: '' });
            history.push('/');
    }

    return (
        <>
            {/* Header */}
            <Typography variant="h4">
                Add Movie
            </Typography>
            <br /><br />

            {/* Form to input new movie information */}
            <form onSubmit={addMovie} autoComplete="off">

                {/* Title Input */}
                <CssTextField
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
                <CssTextField sx={{ width: "500px" }}
                    placeholder="Movie Description"
                    rows="12" multiline required
                    onChange={handleDescChange}
                />
                <br /><br />

                {/* Genre Select */}
                <CssTextField select onChange={handleGenreChange}
                    defaultValue="1"
                    label="Genre"
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


