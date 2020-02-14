import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import services from '../../services/api';

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
    return (
      <ul>
        {movies.map(elem => (
          <li key={elem.id}>
            <Link to={{
							pathname:`movies/${elem.id}`,
							state: { from: this.props.location },
						}}>
							{elem.title || elem.name}
						</Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default HomePage;
