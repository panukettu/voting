import { get } from "lodash";

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
      if (action.state.winner) {
        return {
          entries: undefined,
          vote: { tally: {}, pair: [] },
          winner: action.state.winner
        };
      }
      if (state.winner) {
        delete state.winner;
      }
      const oldPair = get(state, "vote.pair");
      const newPair = get(action.state, "vote.pair");
      if (!compareArrays(oldPair, newPair)) {
        delete state.votedFor;
      }
      return resetVote({ ...state, ...action.state });
    }
    case "VOTE": {
      if (state.vote && state.vote.pair.includes(action.entry)) {
        return { ...state, votedFor: action.entry };
      } else {
        return state;
      }
    }
    case "NEXT": {
      const newState = { ...state };
      delete newState.votedFor;
      return newState;
    }
    case "RESET": {
      return { vote: { tally: {}, pair: [] } };
    }
    default:
      return state;
  }
};

function compareArrays(arr1 = [], arr2 = []) {
  if (arr1.length !== arr2.length) {
    return false;
  } else {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
  }
  return true;
}

function resetVote(state) {
  const { votedFor } = state;
  const pair = get(state, "vote.pair");
  if (votedFor && !pair.includes(votedFor)) {
    delete state.votedFor;
    return state;
  }
  return state;
}

export default reducer;
