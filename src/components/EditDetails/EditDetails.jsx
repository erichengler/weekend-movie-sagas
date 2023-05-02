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

    let { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const movies = useSelector(store => store.movies);
    const genres = useSelector(store => store.genres);
    const genresForMovie = useSelector(store => store.genresForMovie);

    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' });
    }, []);


    let [newMovie, setMovie] = useState({
        id: movies[id - 1].id,
        title: movies[id - 1].title,
        description: movies[id - 1].description
    })

    // Saves changes and brings user back to details
    const saveDetails = (movie) => {
        if ((newMovie.description).length < 1160) {
            dispatch({ type: 'EDIT_MOVIE', payload: newMovie })
            setMovie({ id: movies[id - 1].id, title: '', description: '' });
            history.push(`/details/${id}`)
        } else {
            alert('Your movie description is a bit too long! (Max: 1160 characters)')
        }
    }
    // Cancels changes and brings user back to details
    const backToDetails = () => {
        history.push(`/details/${id}`)
    }

    // --------- START of handleChange ---------
    const handleTitleChange = (event) => {
        setMovie({ ...newMovie, title: event.target.value });
    }
    const handleDescChange = (event) => {
        setMovie({ ...newMovie, description: event.target.value });
    }
    // --------- END of handleChange ---------

    return (
        <>
            <Typography variant='h4'>
                Edit Details
            </Typography>
            <br /><br />
            <form>
                {/* Edit Title */}
                <CssTextField
                    label="Title"
                    defaultValue={movies[id - 1].title}
                    required onChange={handleTitleChange}
                />
                <br /><br /><br />
                {/* Edit Description */}
                <CssTextField sx={{ width: '300px' }}
                    label="Description"
                    defaultValue={movies[id - 1].description}
                    rows="7" multiline required
                    onChange={handleDescChange}
                />
                <br /><br />
                {/* Select Genres */}

                {/* TODO: Select genres */}
                
                {/* Buttons */}
                <Button
                    onClick={() => saveDetails(movies[id - 1].id)}
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
        </>
    );
}

export default EditDetails;