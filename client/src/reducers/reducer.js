const reducer = (
  state = {
    vote: {
      pair: []
    }
  },
  action
) => {
  switch (action.type) {
    case "SET_STATE": {
      return resetVote({ ...state, ...action.state });
    }
    case "VOTE": {
      if (state.vote.pair.includes(action.entry)) {
        return { ...state, votedFor: action.entry };
      } else {
        return state;
      }
    }
    default:
      return state;
  }
};

function resetVote(state) {
  const {
    votedFor,
    vote: { pair }
  } = state;
  if (votedFor && !pair.includes(votedFor)) {
    delete state.votedFor;
    return state;
  }
  return state;
}

export default reducer;
