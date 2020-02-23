import React, { Component } from 'react';
import services from '../../services/api';
import MoviesList from '../movies-list/MoviesList';

class HomePage extends Component {
  state = {
    movies: []
  };

  async componentDidMount() {
    try {
      const data = await services.getTranding();
      this.setState({
        movies: data
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    //console.log(this.state.movies);
    const { movies } = this.state;
    const { location } = this.props;
    return (
      <section className="section">
        <h2 className="title is-2">Популярные фильмы</h2>
        <MoviesList movies={movies} location={location} />
      </section>
    );
  }
}

export default HomePage;
