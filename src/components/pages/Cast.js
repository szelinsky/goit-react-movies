import React, { Component } from 'react';
import services from '../../services/api';
import nophoto from '../../images/nopicture.jpg'

class Cast extends Component {
  state = {
    cast: [],
    actorPhoto: ''
  };

  async componentDidMount() {
    try {
      const data = await services.getCast(this.props.match.params.movieId);
      this.setState({
        cast: data,
        actorPhoto: 'no'
      });
    } catch (error) {
      console.log(error);
    }
    //console.log(this.state.cast);
  }
  render() {
    const { cast } = this.state;
    return (
      <>
        <div className="columns is-multiline">
          {cast.map(elem => (
            <div className="column is-one-third">
              {console.log(elem.id)}
              <div className="box" key={elem.id}>
                <article className="media">
                  <div className="media-left">
                    <figure className="image is-64x64 is-square">
                      {elem.profile_path ? (
                        <img
                          className="img-wrap"
                          src={`https://image.tmdb.org/t/p/w500${elem.profile_path}`}
                          alt=""
                        />
                      ) : (
                        <img
                          className="img-wrap"
                          src={nophoto}
                          alt=""
                        />
                      )}
                    </figure>
                  </div>
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <strong>{elem.name}</strong>
                        <br />
                        Роль: {elem.character}
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default Cast;
