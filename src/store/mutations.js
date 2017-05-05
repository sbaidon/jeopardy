import * as types from './mutation-types';
import utils from './utils';

/* eslint-disable */

const mutations = {
  [types.REGISTER_TEAM](state, { name }) {
    const record = state.teams.find(p => p.name === name);
    if (!record) {
      state.teams.push({
        name,
        color: utils.getRandomColor(),
        points: 0,
        questionsAnswered: 0,
      });
      state.isTeamRegistered = false;
    } else {
      state.isTeamRegistered = true;
    }
  },
  [types.ADD_QUESTION](state, { level, question }) {
    state.questions[level].push(question);
  },
  [types.ADVANCE_TURN](state) {
    state.teamToAnswer =  (state.teamToAnswer + 1) % 4
  },
  [types.ADVANCE_TIMER](state, interval) {
    if(state.timer <= 0) {
      state.timer = 30;
      return clearInterval(interval);
    }
    state.timer -= 1;
    return clearInterval(interval);
  },
  [types.RESET_TIMER](state) {
    state.timer = 30;
  },
  [types.ADD_POINTS](state, { points }) {
    state.teams[state.teamToAnswer].points += points;
  }
};

export default mutations;
/* eslint-enable */
