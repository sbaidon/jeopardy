import axios from 'axios';

import { QUESTIONS_PATHS } from './servicePaths';

export default {
  getRandomQuestion() {
    return axios.get(`${QUESTIONS_PATHS.BASE_URL}${QUESTIONS_PATHS.RANDOM_QUESTION}`);
  },
  getCategories() {
    return axios.get(`${QUESTIONS_PATHS.BASE_URL}${QUESTIONS_PATHS.CATEGORIES}`);
  },
  getCategory(id) {
    return axios.get(`${QUESTIONS_PATHS.BASE_URL}${QUESTIONS_PATHS.CATEGORY}?=${id}`);
  },
  setInvalid(id) {
    return axios.get(`${QUESTIONS_PATHS.BASE_URL}${QUESTIONS_PATHS.INVLIDA}?=${id}`);
  },
};
