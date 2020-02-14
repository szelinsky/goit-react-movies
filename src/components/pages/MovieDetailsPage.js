import React, { Component } from 'react';
//import { useHistory } from 'react-router-dom';
import services from '../../services/api';

class MovieDetailsPage extends Component {
  state = {
    movie: {},
    poster: ''
  };

  async componentDidMount() {
    try {
      const data = await services.getDetails(this.props.match.params.movieId);
      this.setState({
        movie: data,
        poster: data.poster_path
      });
      //console.log(this.state.movie);
    } catch (error) {
      console.log(error);
    }
  }

  showYearRelease = () => {
    const date = new Date(this.state.movie.release_date);
    const options = {
      year: 'numeric'
    };
    return date.toLocaleString('en-US', options);
  };

  goBack = () => {
    this.props.history.goBack();
	};
	
	handleGoBack = () => {
		this.props.history.push(this.props.location.state.from);
	};

  render() {
    //services.getDetails(330457).then(console.log);
    //console.log(this.props.match);
    //console.log(this.state.poster);
    const { movie, poster } = this.state;
    const date = this.showYearRelease();

    return (
      <>
        <h2>
          {movie.title || movie.original_title} ({date})
        </h2>
        {poster && (
          <img src={`https://image.tmdb.org/t/p/w500${poster}`} alt="" />
        )}
        <p>{movie.overview}</p>
        <button type="button" onClick={this.handleGoBack}>
          go back
        </button>
      </>
    );
  }
}

export default MovieDetailsPage;
