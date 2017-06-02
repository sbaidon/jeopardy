/* eslint-disable */
import * as types from './mutation-types';
import api from '../api/questions';
import wordApi from '../api/words';

const actions = {
  registerTeam({ commit }, name) {
    commit(types.REGISTER_TEAM, { name });
  },
  resetTeams({ commit }) {
    commit(types.RESET_TEAMS);
  },
  resetQuestions({ commit }) {
    commit(types.RESET_QUESTIONS);
  },
  advanceTurn({ commit }) {
    commit(types.ADVANCE_TURN);
  },
  getQuestion({ commit, state }) {
    let question = {};

    api.getRandomQuestion()
    .then(({ data }) => {
      question = data[0];
      return wordApi.getRelatedWord(question.answer);
    })
    .then(({ data }) => {
      question.options = [question.answer, data[0].word, data[1].word];
      commit(types.ADD_QUESTION, { question })
    })
    .catch(error => {
      console.log(error);
      commit(types.ADD_QUESTION, { question: {
        question: 'BONUS',
        answer: 'THIS IS THE ANSWER',
        options: ['THIS IS THE ANSWER', 'second option', 'third option'],
        value: 1000,
        }})
    });
  },
  checkAnswer({ commit }, { answer, realAnswer, points }) {
    if (answer === realAnswer) {
      commit(types.ADD_POINTS, { points });
    }
  },
};

export default actions
