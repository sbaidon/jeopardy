import axios from 'axios';

import servicePaths from './servicePaths';

export default {
  getRandomQuestion() {
    return axios.get(`${servicePaths.BASE_URL}${servicePaths.RANDOM_QUESTION}`);
  },
  getCategories() {
    return axios.get(`${servicePaths.BASE_URL}${servicePaths.CATEGORIES}`);
  },
  getCategory(id) {
    return axios.get(`${servicePaths.BASE_URL}${servicePaths.CATEGORY}?=${id}`);
  },
  setInvalid(id) {
    return axios.get(`${servicePaths.BASE_URL}${servicePaths.INVLIDA}?=${id}`);
  },

};
