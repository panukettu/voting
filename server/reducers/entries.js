const entries = (state = {}, action) => {
  switch (action.type) {
    case "SET_ENTRIES": {
      return {
        entries: state.entries
          ? [...state.entries, ...action.entries]
          : [...action.entries]
      };
    }
    case "NEXT": {
      let entries;
      if (state.entries) {
        entries = state.entries.concat(getWinner(state.vote));
      } else {
        return state;
      }
      if (entries.length === 1 && !state.winner) {
        return {
          winner: entries[0]
        };
      }
      return {
        entries: entries.slice(2),
        vote: {
          pair: entries.slice(0, 2)
        }
      };
    }
    case "VOTE": {
      return { ...state, vote: vote(state.vote, action) };
    }
    default:
      return state;
  }
};

const vote = (state = {}, action) => {
  switch (action.type) {
    case "VOTE": {
      return {
        ...state,
        tally: {
          ...state.tally,
          [action.entry]: (state.tally && state.tally[action.entry] + 1) || 1
        }
      };
    }
    default:
      return state;
  }
};

function getWinner(obj) {
  if (!obj) return [];
  const [a, b] = obj.pair;
  if (!obj.tally) return [a, b];
  const aVotes = obj.tally[a] || 0;
  const bVotes = obj.tally[b] || 0;
  if (aVotes > bVotes) return [a];
  else if (bVotes > aVotes) return [b];
  else return [a, b];
}

export default entries;
