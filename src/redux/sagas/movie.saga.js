import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all movies:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });
    } catch {
        console.log('get all movies error');
    }
}

function* fetchAllGenres() {
    // get all genres from the DB
    try {
        const genres = yield axios.get('/api/genre');
        console.log('get all genres:', genres.data);
        yield put({ type: 'SET_GENRES', payload: genres.data });
    } catch {
        console.log('get all genres error');
    }
}

function* fetchThisMovie(action) {
    // get this movie from the DB
    try {
        console.log(`Get this movie with ID: ${action.payload}`);
        const movie = yield axios.get(`/api/movie/details?id=${action.payload}`);
        const movieGenres = movie.data.map(genre => {
            return { name: genre.name, value: genre.genre_id }
        })
        yield put({ type: 'SET_MOVIE', payload: { movie: movie.data[0], genres: movieGenres } })
    } catch {
        console.log('Get this movie error')
    }
}

function* postMovie(action) {
    try {
        yield axios.post('/api/movie', action.payload);
        yield put({ type: 'FETCH_MOVIES' });
        action.setMovie({});
    } catch (error) {
        console.log(`Error in postMovie`, error);
        alert('Something went wrong!');
    }
}

function* editMovie(action) {
    try {
        yield axios.put(`/api/movie`, action.payload);
        yield put({ type: 'FETCH_MOVIES' });
    } catch (error) {
        console.log(`Error in editMovie ${error}`);
        alert('Something went wrong!');
    }
}

// Create the rootSaga generator function
function* movieSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_GENRES', fetchAllGenres);
    yield takeEvery('ADD_MOVIE', postMovie);
    yield takeEvery('EDIT_MOVIE', editMovie)
    yield takeEvery('FETCH_THIS_MOVIE', fetchThisMovie);
}

export default movieSaga;