import * as types from './mutation-types';

/* eslint-disable */

const mutations = {
  [types.REGISTER_TEAM](state, { name }) {
    const record = state.teams.find(p => p.name === name);
    if (!record) {
      state.teams.push({
        name,
        points: 0,
        questionsAnswered: 0,
      });
      state.isTeamRegistered = false;
    } else {
      state.isTeamRegistered = true;
    }
  },
  [types.ADD_QUESTION](state, { question }) {
    state.questions.push(question);
  },
  [types.ADVANCE_TURN](state) {
    state.teamToAnswer =  (state.teamToAnswer + 1) % 4
  },
  [types.ADVANCE_TIMER](state) {
    if(state.timer <= 0) {
      state.timer = 30;
    }
    state.timer -= 1;
  },
  [types.RESET_TIMER](state) {
    state.timer = 30;
  },
  [types.ADD_POINTS](state, { points }) {
    state.teams[state.teamToAnswer].points += points;
  },
  [types.RESET_TEAMS](state) {
    state.teams = [];
  },
  [types.RESET_QUESTIONS](state) {
    state.questions = [];
  },
};

export default mutations;
/* eslint-enable */
