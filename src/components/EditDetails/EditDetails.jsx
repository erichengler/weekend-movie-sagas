import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Select from 'react-select'
// ------- MUI Imports -------
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// ------- START of custom styling -------
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
const customStyles= {
    control: (provided, state) => ({
       ...provided,
       minHeight: 35,
       backgroundColor: '#ddb9ac',
       color: state.isFocused ? 'grey' : 'black',
       border: state.isFocused ? "1px solid #A62B1F" : "1px solid #cccccc",
       boxShadow: state.isFocused ? "0px 0px 3px #A62B1F" : "0px 0px 2px black",
       "&:hover": {
         border: "1px solid black",
         boxShadow: "0px 0px 6px grey"
       }
     }),
     dropdownIndicator: base => ({
        ...base,
        color: '#A62B1F'
     }),
     clearIndicator: base => ({
        ...base,
        color: '#A62B1F'
     }),
   };
// ------- END of custom styling -------


function EditDetails() {
    // Get this movie and all genres on load
    useEffect(() => {
        dispatch({ type: 'FETCH_THIS_MOVIE', payload: id });
        dispatch({ type: 'FETCH_GENRES' });
        console.log(movieGenres);
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
            {/* Checking if reducers have values before loading */}
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
                <CssTextField sx={{ width: '500px' }}
                    label="Description"
                    defaultValue={description}
                    rows="12" multiline required
                    onChange={handleDescChange}
                />
                <br /><br /><br />

                {/* Select Genres */}
                <div style={{ width: '350px', margin: 'auto' }}>
                <Select              
                    required
                    isMulti
                    placeholder="Select Genres"
                    defaultValue={movieGenres}
                    options={genres}
                    getOptionLabel={(genre) => genre.name}
                    onChange={(selected) => setMovieGenres(selected)}
                    menuPlacement="auto"
                    styles={customStyles}
                />
                </div>
                <br /><br />

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