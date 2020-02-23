import React, { Component, lazy, Suspense } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
//import Cast from './Cast';
//import Reviews from './Reviews';
import services from '../../services/api';
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.css';

const AsyncCast = lazy(() =>
  import('./Cast' /* webpackChunkName: "cast-page" */)
);

const AsyncReviews = lazy(() =>
  import('./Reviews' /* webpackChunkName: "reviews-page"*/)
);
class MovieDetailsPage extends Component {
  state = {
    movie: {
      genres: []
    },
    poster: '',
    backPath: ''
  };

  async componentDidMount() {
    try {
      const data = await services.getDetails(this.props.match.params.movieId);
      this.setState({
        movie: data,
        poster: data.poster_path,
        backPath: this.props.location.state.from
      });
      //console.log(this.state.movie.genres);
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

  showGenres = () => {
    const { genres } = this.state.movie;
    const data = genres.map(elem => elem.name);

    //const data = genres.map(elem => elem.name);
    // console.log('жанры', data);
    // console.log(this.state.movie.genres);
    return data.join(', ');
  };

  goBack = () => {
    //this.props.history.goBack(); //вернет на другой сайт, если зашел по ссылке

    //console.log(this.props.location.state.from.search);
    const { search, pathname } = this.props.location.state.from;
    if (search) {
      this.props.history.push(pathname + search);
    } else {
      this.props.history.push(pathname);
    }
  };

  render() {
    // console.log("-----------");
    // console.log('_______', typeof this.state.movie.genres );
    // console.log('_______', this.state.movie.genres.constructor === Array);
    // console.log("-----------");

    const { movie, poster } = this.state;
    const { movieId } = this.props.match.params;
    const date = this.showYearRelease();
    const genres = this.showGenres();

    // const { genres } = this.state;
    // console.log('genres-----', genres)
    //console.log(this.showGenres());
    //const { genres } = this.state;
    // const genres = this.state.movie.genres

    return (
      <>
        <div style={{ padding: '1.5rem' }}>
          <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li onClick={this.goBack}>
                <Link to="#">
                  <span className="icon is-small">
                    <i className="fas fa-arrow-left" aria-hidden="true"></i>
                  </span>
                  <span>Go back</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="columns">
          <div className="column is-one-third has-text-centered">
            {poster && (
              <img
                src={`https://image.tmdb.org/t/p/w500${poster}`}
                width="343"
                height="515"
                alt=""
              />
            )}
          </div>
          <section className="section">
            <div className="column">
              <h1 className="title">
                {movie.title || movie.original_title} ({date})
              </h1>
              <p className="title is-6">
                Оценка зрителей: {movie.vote_average * 10}%
              </p>
              <p className="content">{movie.overview}</p>
              <p className="title is-6">Жанр:</p>
              <p className="subtitle is-6">{genres}</p>
              <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                  <li>
                    <Link
                      to={{
                        pathname: `/movies/${movieId}/cast`,
                        state: { from: this.state.backPath }
                      }}
                    >
                      <span className="icon is-small">
                        <i className="fas fa-film" aria-hidden="true"></i>
                      </span>
                      <span>В ролях</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={{
                        pathname: `/movies/${movieId}/reviews`,
                        state: { from: this.state.backPath }
                      }}
                    >
                      <span className="icon is-small">
                        <i className="fas fa-thumbs-up" aria-hidden="true"></i>
                      </span>
                      <span>Отзывы</span>
                    </Link>
                  </li>
                </ul>
              </nav>
              <Suspense fallback={<div>Загрузка...</div>}>
                <Switch>
                  <Route path="/movies/:movieId/cast" component={AsyncCast} />
                  <Route
                    path="/movies/:movieId/reviews"
                    component={AsyncReviews}
                  />
                </Switch>
              </Suspense>
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default MovieDetailsPage;
