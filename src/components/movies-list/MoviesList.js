import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const MoviesList = ({ movies, location }) => {
  return (
    <div className="columns is-multiline">
      {movies.map(elem => (
        <div className="column is-one-quarter" key={elem.id}>
          <div className="card">
            <div className="card-image">
              <figure className="image is-4by3">
                <Link
                  to={{
                    pathname: `movies/${elem.id}`,
                    state: { from: location }
                  }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${elem.backdrop_path}`}
                    alt=""
                  />
                </Link>
              </figure>
            </div>
            <div className="card-content">
              <div className="media" style={{ height: 45 }}>
                <div className="media-content">
                  <p className="title is-6">
                    <Link
                      to={{
                        pathname: `movies/${elem.id}`,
                        state: { from: location }
                      }}
                    >
                      {elem.title || elem.name}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default withRouter(MoviesList);
