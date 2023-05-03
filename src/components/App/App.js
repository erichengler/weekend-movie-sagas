import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
// ------- Component Imports -------
import MovieList from '../MovieList/MovieList'
import MovieDetails from '../MovieDetails/MovieDetails';
import MovieForm from '../MovieForm/MovieForm';
import EditDetails from '../EditDetails/EditDetails';
import Header from '../Header/Header';
// ------- MUI Imports -------
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <Route path="/" exact>
          <MovieList />
        </Route>

        {/* Details page */}
        <Route path="/details/:id" exact>
          <MovieDetails />
        </Route>

        {/* Add Movie page */}
        <Route path="/form" exact>
          <MovieForm />
        </Route>

        {/* Edit Details page */}
        <Route path="/edit/:id" exact>
          <EditDetails />
        </Route>

      </Router>
    </div>
  );
}


export default App;
