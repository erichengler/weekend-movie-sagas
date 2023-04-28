import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'

function MovieList() {

    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' });
    }, []);

    // Takes user to details of the movie that was clicked on
    const toDetails = (id) => {
        history.push(`/details/${id}`)
    }

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title}                             
                                onClick={ () => toDetails(movie.id) }
                                className="movieImages"
                            />
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;