/* eslint-disable */
import * as types from './mutation-types';
import api from '../api/questions';
import wordApi from '../api/words';

const actions = {
  registerTeam({ commit }, name) {
    commit(types.REGISTER_TEAM, { name });
  },
  advanceTurn({ commit }) {
    commit(types.ADVANCE_TURN);
  },
  getQuestion({ commit }, level) {
    api.getRandomQuestion()
    .then(({ data }) => {
      const question = data[0];
      commit(types.ADD_QUESTION, { level, question });
    })
    .catch(error => console.log(error));
  },
  checkAnswer({ commit }, { answer, realAnswer, points }) {
    if (answer === realAnswer) {
      commit(types.ADD_POINTS, { points });
    }
  },
  getRelatedWord({ commit }, { word }) {
    wordApi.getRelatedWord(word)
    .then(({ data }) => {
      const relatedWords = [data[0].word, data[1].word];
      commit(types.UPDATE_OPTIONS,  relatedWords)
    });
  }
};

export default actions
