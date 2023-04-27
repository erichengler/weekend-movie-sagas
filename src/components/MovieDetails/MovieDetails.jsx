import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import './MovieDetails.css';

function MovieDetails() {

    let {id} = useParams();
    let history = useHistory();

    const movies = useSelector(store => store.movies);
    const genres = useSelector(store => store.genres);

    const backToList = () => {
        history.push('/')
    }

        return (
            <>
                <h3>{movies[id-1].title}</h3>
                <img src={movies[id-1].poster} alt={movies[id-1].title} />
                <br /><br />
                <p className="detailsDescription">{movies[id-1].description}</p>
                <br /><br />
                <button onClick={backToList}>Back to List</button>
            </>
        )
    }

    export default MovieDetails;