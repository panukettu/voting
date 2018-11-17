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

  it("clears votedFor when next", () => {
    const stateBefore = {
      votedFor: "A",
      entries: ["C", "D"],
      vote: {
        pair: ["A", "B"],
        tally: { A: 1 }
      }
    };

    const action = {
      type: "NEXT"
    };

    const stateAfter = { ...stateBefore };
    delete stateAfter.votedFor;
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  // it("clears votedFor after two entries", () => {
  //   const actions = [
  //     { type: "VOTE", entry: "A" },
  //     { type: "NEXT" },
  //     { type: "VOTE", entry: "C" },
  //     { type: "NEXT" }
  //   ];

  //   const stateAfter = {
  //     entries: ["C", "D"],
  //     vote: {
  //       pair: ["A", "B"],
  //       tally: { A: 2 }
  //     }
  //   };

  //   expect(actions.reduce(reducer, {})).toEqual(stateAfter);
  // });

  it("resets", () => {
    const stateBefore = {
      votedFor: "A",
      entries: ["C", "D"],
      vote: {
        pair: ["A", "B"],
        tally: { A: 1 }
      }
    };

    const action = {
      type: "RESET"
    };

    const stateAfter = { vote: { tally: {}, pair: [] } };
    delete stateAfter.votedFor;
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});
