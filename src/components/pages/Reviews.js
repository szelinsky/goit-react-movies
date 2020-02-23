import React, { Component } from 'react';
import services from '../../services/api';

class Reviews extends Component {
  state = {
    reviews: []
  };

  async componentDidMount() {
    try {
      const data = await services.getReviews(this.props.match.params.movieId);
      this.setState({
        reviews: data
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { reviews } = this.state;
    return (
      <>
        {reviews.length > 0 ? (
          reviews.map(elem => (
            <div className="box" key={elem.id}>
              <article className="media">
                <div className="media-content">
                  <div className="content">
                    <p>
                      <strong>{elem.author}</strong>
                      <br />
                      {elem.content}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          ))
        ) : (
          <div>Нет отзывов</div>
        )}
      </>
    );
  }
}

export default Reviews;
