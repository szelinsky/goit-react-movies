import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import services from '../../services/api';

class MoviesPage extends Component {
  state = {
    movies: [],
    query: ''
  };

  handleChange = e => {
    this.setState({
      query: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    //console.log(this.state.query);
    const { query } = this.state;
    const data = await services.searchMovies(query);
    this.setState({
      movies: data
    });
    //console.log(this.state.movies);
  };

  render() {
    const { query, movies } = this.state;

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={query} onChange={this.handleChange} />
          <button type="submit">Search</button>
        </form>
        <ul>
          {movies.map(elem => (
            <li key={elem.id}>
              <Link
                to={{
									pathname: `movies/${elem.id}`,
									state: { from: this.props.location },
                }}
              >
                {elem.title || elem.name}
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default MoviesPage;
