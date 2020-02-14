import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = 'f3ac9d74d34b181f3c57c772b32b78e5';
const params = { api_key: API_KEY, language: 'ru-RU' };

export default {
  async getTranding() {
    try {
      const data = await axios.get('trending/all/day', {
        params
      });
      return data.data.results;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  async searchMovies(query) {
    try {
      const data = await axios.get(
        `search/movie?query=${query}&page=1&include_adult=false`,
        { params }
      );
      return data.data.results;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  async getDetails(id) {
    try {
      const data = await axios.get(`movie/${id}`, { params });
      return data.data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
};

// детально о фильме
//https://api.themoviedb.org/3/movie/{id!315635}?api_key=f3ac9d74d34b181f3c57c772b32b78e5&language=en-US
