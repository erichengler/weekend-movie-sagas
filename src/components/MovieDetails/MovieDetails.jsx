import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios';
import './MovieDetails.css';

function MovieDetails() {

    let { id } = useParams();
    let history = useHistory();
    let dispatch = useDispatch();

    const movies = useSelector(store => store.movies);
    const genresForMovie = useSelector(store => store.genresForMovie)

    // Brings user back to movie list view
    const backToList = () => {
        history.push('/')
    }

    // GET genres of specific movie based on id
    const getGenresForMovie = () => {
        console.log('In getGenreForMovie', genresForMovie);
        axios.get(`/api/movie/${movies[id - 1].id}`).then((response) => {
            dispatch({ type: 'SET_GENRES_FOR_MOVIE', payload: response.data });
        }).catch(error => {
            alert('Something went wrong!');
        })
    }

    useEffect(() => {
        getGenresForMovie();
    }, [])

    return (
        <div className="details">
            <h3>{movies[id - 1].title}</h3>
            <img src={movies[id - 1].poster} alt={movies[id - 1].title} />
            <br /><br />
            <p className="detailsDescription">{movies[id - 1].description}</p>
            <h4>Genres:</h4>
            <ul className="genreList">
                {
                    genresForMovie.map(genre => {
                        return <li key={genre.id}>
                            {genre.name}
                        </li>
                    })
                }
            </ul>
            <br />
            <button onClick={backToList}>Back to List</button>
            <br />
        </div>
    )
}

export default MovieDetails;