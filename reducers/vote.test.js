const { vote } = require("./vote");

describe("vote", () => {
  it("creates a tally when a vote is cast", () => {
    const stateBefore = {
      pair: ["Inception", "Lord of the Rings"]
    };

    const action = { type: "CAST_VOTE", payload: "Lord of the Rings" };
    const stateAfter = {
      pair: ["Inception", "Lord of the Rings"],
      tally: { "Lord of the Rings": 1 }
    };

    expect(vote(stateBefore, action)).toEqual(stateAfter);
  });

  it("can vote again", () => {
    const stateBefore = {
      pair: ["Inception", "Lord of the Rings"],
      tally: { "Lord of the Rings": 2 }
    };

    const action = { type: "CAST_VOTE", payload: "Lord of the Rings" };
    const stateAfter = {
      pair: ["Inception", "Lord of the Rings"],
      tally: { "Lord of the Rings": 3 }
    };

    expect(vote(stateBefore, action)).toEqual(stateAfter);
  });

  it("can vote for the other candidate", () => {
    const stateBefore = {
      pair: ["Inception", "Lord of the Rings"],
      tally: { "Lord of the Rings": 1 }
    };

    const action = { type: "CAST_VOTE", payload: "Inception" };
    const stateAfter = {
      pair: ["Inception", "Lord of the Rings"],
      tally: { Inception: 1, "Lord of the Rings": 1 }
    };

    expect(vote(stateBefore, action)).toEqual(stateAfter);
  });

  it("can vote when both candidates are present", () => {
    const stateBefore = {
      pair: ["Inception", "Lord of the Rings"],
      tally: { "Lord of the Rings": 1, Inception: 3 }
    };

    const action = { type: "CAST_VOTE", payload: "Inception" };
    const stateAfter = {
      pair: ["Inception", "Lord of the Rings"],
      tally: { Inception: 4, "Lord of the Rings": 1 }
    };

    expect(vote(stateBefore, action)).toEqual(stateAfter);
  });
});
