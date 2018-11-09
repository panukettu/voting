const { vote } = require("./reducers/vote");
const { entries } = require("./reducers/entries");

const combineReducers = reducers => (state = {}, action) =>
  Object.keys(reducers).reduce((nextState, key) => {
    nextState[key] = reducers[key](state[key], action);

    return nextState;
  }, {});

describe("application logic", () => {
  const reducers = combineReducers({
    entries,
    vote
  });

  it("takes two entries up to vote", () => {
    const stateBefore = {
      entries: [
        "Inception",
        "Lord of the Rings",
        "Trainspotting",
        "Wolf of Wall Street"
      ]
    };
    const action = {
      type: "NEXT_VOTE",
      payload: { pair: stateBefore.entries.slice(0, 2) }
    };
    const stateAfter = {
      entries: ["Trainspotting", "Wolf of Wall Street"],
      vote: {
        pair: ["Inception", "Lord of the Rings"]
      }
    };

    expect(reducers(stateBefore, action)).toEqual(stateAfter);
  });

  it("returns the winner back and removes the loser", () => {
    function getWinner(obj) {
      const [a, b] = obj.pair;
      const aVotes = obj.tally[a];
      const bVotes = obj.tally[b];

      if (aVotes > bVotes) return [a];
      else if (bVotes > aVotes) return [b];
      else return [a, b];
    }

    const stateBefore = {
      entries: ["Trainspotting", "Wolf of Wall Street"],
      vote: {
        pair: ["Inception", "Lord of the Rings"],
        tally: { Inception: 12, "Lord of the Rings": 11 }
      }
    };
    const action = {
      type: "NEXT_VOTE",
      payload: {
        pair: stateBefore.entries.slice(0, 2),
        winner: getWinner(stateBefore.vote)
      }
    };
    const stateAfter = {
      entries: ["Inception"],
      vote: {
        pair: ["Trainspotting", "Wolf of Wall Street"],
        winner: ["Inception"]
      }
    };

    expect(reducers(stateBefore, action)).toEqual(stateAfter);
  });

  it("returns both candidates if tied", () => {
    function getWinner(obj) {
      const [a, b] = obj.pair;
      const aVotes = obj.tally[a];
      const bVotes = obj.tally[b];

      if (aVotes > bVotes) return [a];
      else if (bVotes > aVotes) return [b];
      else return [a, b];
    }

    const stateBefore = {
      entries: ["Trainspotting", "Wolf of Wall Street", "Inception", "Shrek"],
      vote: {
        pair: ["Inception", "Lord of the Rings"],
        tally: { Inception: 12, "Lord of the Rings": 12 }
      }
    };
    const action = {
      type: "NEXT_VOTE",
      payload: {
        pair: stateBefore.entries.slice(0, 2),
        winner: getWinner(stateBefore.vote)
      }
    };
    const stateAfter = {
      entries: ["Inception", "Shrek", "Inception", "Lord of the Rings"],
      vote: {
        pair: ["Trainspotting", "Wolf of Wall Street"],
        winner: ["Inception", "Lord of the Rings"]
      }
    };

    expect(reducers(stateBefore, action)).toEqual(stateAfter);
  });
});
