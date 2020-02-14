import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
//import HeaderMenu from './header-menu/HeaderMenu';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailsPage from './pages/MovieDetailsPage'
import Navigation from './navigation/Navigation'

const App = () => (
  <>
    <Navigation />
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/movies/:movieId" component={MovieDetailsPage} />
      <Route path="/movies" component={MoviesPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </>
);

export default App;
