import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
// Styling
import './index.css';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_GENRES', fetchAllGenres);
    yield takeEvery('ADD_MOVIE', postMovie);
    yield takeEvery('EDIT_MOVIE', editMovie)
    yield takeEvery('FETCH_THIS_MOVIE', fetchThisMovie);
}

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

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store all genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store a specific movie
const thisMovie = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIE':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        thisMovie,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
);
