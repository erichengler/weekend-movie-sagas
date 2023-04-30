import { useState } from 'react';
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// MUI Imports
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

    const movies = useSelector(store => store.movies);

    let [newMovie, setMovie] = useState({
        title: movies[id - 1].title, description: movies[id - 1].description
    })

    // Saves changes and brings user back to details
    const saveDetails = (event) => {
        if ((newMovie.description).length < 1160) {
            event.preventDefault();
            // TODO : Axios PUT Request with dispatch 

            setMovie({ title: '', description: '' });
            history.push(`/details/${id}`)
        } else {
            event.preventDefault();
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
            <br />
            <form onSubmit={saveDetails}>
                {/* Edit Title */}
                <CssTextField
                    label="Title"
                    defaultValue={movies[id - 1].title}
                    required onChange={handleTitleChange}
                />
                <br /><br />
                {/* Edit Description */}
                <CssTextField sx={{ width: '300px' }}
                    label="Description"
                    defaultValue={movies[id - 1].description}
                    rows="7" multiline required
                    onChange={handleDescChange}
                />
                <br /><br />
                <Button type="submit"
                    sx={{ color: '#A62B1F', marginRight: '15px' }}
                >
                    Save
                </Button>
                |
                <Button onClick={backToDetails}
                    sx={{ color: '#A62B1F', marginLeft: '15px' }}
                >
                    Cancel
                </Button>
            </form>
        </>
    );
}

export default EditDetails;