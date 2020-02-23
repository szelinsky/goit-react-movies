import React, { Component } from 'react';
import services from '../../services/api';
import queryString from 'query-string';
import MoviesList from '../movies-list/MoviesList'

class MoviesPage extends Component {
  state = {
    movies: [],
    query: ''
  };

  async componentDidMount() {
    if (this.props.location.search) {
      const parsed = queryString.parse(this.props.location.search);
      //console.log(parsed.query);
      const data = await services.searchMovies(parsed.query);
      this.setState({
        movies: data
      });
    }
  }

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
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `?query=${this.state.query}`
    });
  };

  render() {
    //console.log(this.state.movies);
    const { query, movies } = this.state;
    const { location } = this.props;

    return (
      <section className="section">
        <form onSubmit={this.handleSubmit}>
          <div className="field has-addons" style={{marginBottom: 20}}>
            <div className="control is-expanded">
              <input
                className="input"
                type="text"
                value={query}
                onChange={this.handleChange}
                placeholder="Поиск..."
              />
            </div>
            <div className="control">
              <button type="submit" className="button is-info">Найти</button>
            </div>
          </div>
        </form>

        <MoviesList movies={movies} location={location}/>
      </section>
    );
  }
}

export default MoviesPage;
