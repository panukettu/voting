const entries = (state = [], action) => {
  switch (action.type) {
    case "ADD_ENTRIES": {
      return [...state, ...action.payload];
    }
    case "NEXT_VOTE": {
      return action.payload.winner
        ? [...state.slice(2), ...action.payload.winner]
        : [...state.slice(2)];
    }
    default:
      return state;
  }
};

module.exports = {
  entries
};
