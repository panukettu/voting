const vote = (state = {}, action) => {
  switch (action.type) {
    case "NEXT_VOTE": {
      return action.payload;
    }
    case "CAST_VOTE": {
      return {
        pair: state.pair,
        tally: {
          ...state.tally,
          [action.payload]:
            (state.tally && state.tally[action.payload] + 1) || 1
        }
      };
    }
    default:
      return state;
  }
};

module.exports = {
  vote
};
