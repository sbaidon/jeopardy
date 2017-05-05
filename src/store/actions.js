/* eslint-disable */
import * as types from './mutation-types';
import api from '../api/questions';

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
  }
};

export default actions
