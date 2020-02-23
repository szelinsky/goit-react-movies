import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

//import HomePage from './pages/HomePage';
// import MoviesPage from './pages/MoviesPage';
// import NotFoundPage from './pages/NotFoundPage';
// import MovieDetailsPage from './pages/MovieDetailsPage';
import Navigation from './navigation/Navigation';
import 'bulma/css/bulma.css';

const AsyncHomePage = lazy(() =>
  import('./pages/HomePage' /* webpackChunkName: "home-page" */)
);

const AsyncMoviesPage = lazy(() =>
  import('./pages/MoviesPage' /* webpackChunkName: "movies-page" */)
);

const AsyncMovieDetailsPage = lazy(() =>
  import('./pages/MovieDetailsPage' /* webpackChunkName: "details-page" */)
);

const AsyncNotFoundPage = lazy(() =>
  import('./pages/NotFoundPage' /* webpackChunkName: "notfound-page" */)
);

const App = () => (
  <>
    <Navigation />
    <div className="container">
      <Suspense fallback={<div>Загрузка...</div>}>
        <Switch>
          <Route path="/" exact component={AsyncHomePage} />
          <Route path="/movies/:movieId" component={AsyncMovieDetailsPage} />
          <Route path="/movies" component={AsyncMoviesPage} />
          <Route component={AsyncNotFoundPage} />
        </Switch>
      </Suspense>
    </div>
  </>
);

export default App;
