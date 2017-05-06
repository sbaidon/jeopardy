const getters = {
  teamsRegistered(state) {
    return state.length;
  },
  allQuestions(state) {
    return [...state.firstLevel, ...state.secondLevel, ...state.thirdLevel,
      ...state.fourthLevel, ...state.fifthLevel];
  },
  getOptions(state) {
    return [state.secondOption, state.thirdOption];
  },
};

export default getters;
