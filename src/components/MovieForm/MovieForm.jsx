import { useHistory } from "react-router-dom";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

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
            <h2>Add Movie</h2>
            <form  onSubmit={addMovie}>
                <input type="text" placeholder="Movie Title"
                    required onChange={handleTitleChange}
                />
                <br /><br />
                <input
                    type="text" placeholder="Poster Image URL"
                    required onChange={handlePosterChange}
                />
                <br /><br />
                <textarea
                    onChange={handleDescChange}
                    placeholder="Movie Description"
                    rows="10" cols="30" required>
                </textarea>
                <h4>Genre:</h4>
                <select onChange={handleGenreChange}>
                    <option value="1">Adventure</option>
                    <option value="2">Animated</option>
                    <option value="3">Biographical</option>
                    <option value="4">Comedy</option>
                    <option value="5">Disaster</option>
                    <option value="6">Drama</option>
                    <option value="7">Epic</option>
                    <option value="8">Fantasy</option>
                    <option value="9">Romantic</option>
                    <option value="10">Science Fiction</option>
                    <option value="11">Space-Opera</option>
                    <option value="12">Superhero</option>
                </select>
                <br /><br />
                <input type="submit" />
                <button onClick={backToList}>Cancel</button>
            </form>
            
        </>
    );
}

export default MovieForm;


