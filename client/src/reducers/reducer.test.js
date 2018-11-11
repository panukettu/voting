import reducer from "./reducer";

describe("client reducer", () => {
  it("should set state", () => {
    const stateBefore = {};
    const action = {
      type: "SET_STATE",
      state: {
        vote: {
          pair: ["A", "B"],
          tally: { A: 1, B: 2 }
        }
      }
    };
    const stateAfter = action.state;

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it("should set setVoted prop after voting", () => {
    const stateBefore = {
      vote: {
        pair: ["A", "B"],
        tally: { A: 1, B: 2 }
      }
    };
    const action = { type: "VOTE", entry: "A" };
    const stateAfter = {
      votedFor: "A",
      vote: {
        pair: ["A", "B"],
        tally: { A: 1, B: 2 }
      }
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it("does not set votes for invalid entries", () => {
    const stateBefore = {
      vote: {
        pair: ["A", "B"],
        tally: { A: 1, B: 2 }
      }
    };
    const action = { type: "VOTE", entry: "C" };
    const stateAfter = {
      vote: {
        pair: ["A", "B"],
        tally: { A: 1, B: 2 }
      }
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it("removes votedFor entry when switching pairs", () => {
    const stateBefore = {
      votedFor: "A",
      vote: {
        pair: ["A", "B"],
        tally: { A: 1, B: 2 }
      }
    };
    const action = {
      type: "SET_STATE",
      state: {
        vote: {
          pair: ["D", "E"]
        }
      }
    };

    expect(reducer(stateBefore, action)).toEqual(action.state);
  });
});
