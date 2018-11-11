import entries from "./entries";

describe("entries", () => {
  it("it sets entries", () => {
    const stateBefore = {};
    const action = {
      type: "SET_ENTRIES",
      entries: ["Inception", "Lord of the Rings"]
    };
    const stateAfter = { entries: [...action.entries] };

    expect(entries(stateBefore, action)).toEqual(stateAfter);
  });
});

describe("votes", () => {
  it("creates a tally when a vote is cast", () => {
    const stateBefore = {
      vote: {
        pair: ["Inception", "Lord of the Rings"]
      }
    };

    const action = { type: "VOTE", entry: "Lord of the Rings" };
    const stateAfter = {
      vote: {
        pair: ["Inception", "Lord of the Rings"],
        tally: { "Lord of the Rings": 1 }
      }
    };

    expect(entries(stateBefore, action)).toEqual(stateAfter);
  });

  it("can vote again", () => {
    const stateBefore = {
      vote: {
        pair: ["Inception", "Lord of the Rings"],
        tally: { "Lord of the Rings": 2 }
      }
    };

    const action = { type: "VOTE", entry: "Lord of the Rings" };
    const stateAfter = {
      vote: {
        pair: ["Inception", "Lord of the Rings"],
        tally: { "Lord of the Rings": 3 }
      }
    };

    expect(entries(stateBefore, action)).toEqual(stateAfter);
  });

  it("can vote for the other candidate", () => {
    const stateBefore = {
      vote: {
        pair: ["Inception", "Lord of the Rings"],
        tally: { "Lord of the Rings": 3 }
      }
    };

    const action = { type: "VOTE", entry: "Inception" };
    const stateAfter = {
      vote: {
        pair: ["Inception", "Lord of the Rings"],
        tally: { "Lord of the Rings": 3, Inception: 1 }
      }
    };

    expect(entries(stateBefore, action)).toEqual(stateAfter);
  });

  it("can vote when both candidates are present", () => {
    const stateBefore = {
      vote: {
        pair: ["Inception", "Lord of the Rings"],
        tally: { "Lord of the Rings": 3, Inception: 1 }
      }
    };

    const action = { type: "VOTE", entry: "Inception" };
    const stateAfter = {
      vote: {
        pair: ["Inception", "Lord of the Rings"],
        tally: { "Lord of the Rings": 3, Inception: 2 }
      }
    };

    expect(entries(stateBefore, action)).toEqual(stateAfter);
  });
});
