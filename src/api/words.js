import axios from 'axios';

import { WORDS_PATHS } from './servicePaths';

export default {
  getRelatedWord(word) {
    return axios({
      methods: 'get',
      baseURL: WORDS_PATHS.BASE_URL,
      contentType: 'json',
      params: {
        ml: word,
        max: 5,
      },
    });
  },
};

