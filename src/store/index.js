import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const state = {
  timer: 30,
  teamToAnswer: 0,
  teams: [],
  firstLevel: [],
  secondLevel: [],
  thirdLevel: [],
  fourthLevel: [],
  fifthLevel: [],
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  strict: debug,
});
