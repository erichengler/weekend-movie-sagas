import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// ------- MUI Imports -------
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
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

function EditDetails() {
    // Get this movie and all genres on load
    useEffect(() => {
        dispatch({ type: 'FETCH_THIS_MOVIE', payload: id });
        dispatch({ type: 'FETCH_GENRES' });
    }, []);

    // Takes the id from the url
    let { id } = useParams();

    const history = useHistory();
    const dispatch = useDispatch();

    // Storing current movie and all genres
    const movie = useSelector(store => store.thisMovie);
    const genres = useSelector((store) => store.genres);

    // Saved states for title, description and genres of specific movie
    const [title, setTitle] = useState(movie.movie.title);
    const [description, setDescription] = useState(movie.movie.description);
    const [movieGenres, setMovieGenres] = useState(movie.genres);

    // Saves changes and brings user back to details
    const saveDetails = () => {
        dispatch({ type: 'EDIT_MOVIE', payload: { id, title, description, movieGenres } })
        history.push(`/details/${id}`)
    }

    // Cancels changes and brings user back to details
    const backToDetails = () => {
        history.push(`/details/${id}`)
    }

    // --------- START of handleChange ---------
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }
    const handleDescChange = (event) => {
        setDescription(event.target.value);
    }
    // --------- END of handleChange ---------

    return (
        <div>
            {/* Checking if reducers have a value before loading */}
            {movie.length === 0 || genres.length === 0 ? (
                <h3>Loading...</h3>
            ) : (
                
            <form autoComplete='off'>
                
                {/* Header */}
                <Typography variant='h4'>
                    Edit Details
                </Typography>
                <br /><br />

                {/* Edit Title */}
                <CssTextField
                    label="Title"
                    defaultValue={title}
                    required onChange={handleTitleChange}
                />
                <br /><br /><br />

                {/* Edit Description */}
                <CssTextField sx={{ width: '300px' }}
                    label="Description"
                    defaultValue={description}
                    rows="7" multiline required
                    onChange={handleDescChange}
                />
                <br /><br />

                {/* Select Genres */}



                {/* Buttons */}
                <Button
                    onClick={saveDetails}
                    sx={{ color: '#A62B1F', marginRight: '15px' }}
                >
                    Save
                </Button>
                |
                <Button
                    onClick={backToDetails}
                    sx={{ color: '#A62B1F', marginLeft: '15px' }}
                >
                    Cancel
                </Button>
            </form>
            )}
        </div>
    );
}

export default EditDetails;