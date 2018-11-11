import entries from "./reducers/entries";

describe("application logic", () => {
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
      type: "NEXT"
    };
    const stateAfter = {
      entries: ["Trainspotting", "Wolf of Wall Street"],
      vote: {
        pair: ["Inception", "Lord of the Rings"]
      }
    };

    expect(entries(stateBefore, action)).toEqual(stateAfter);
  });

  it("returns the winner back and removes the loser", () => {
    const stateBefore = {
      entries: ["Trainspotting", "Wolf of Wall Street"],
      vote: {
        pair: ["Inception", "Lord of the Rings"],
        tally: { Inception: 12, "Lord of the Rings": 11 }
      }
    };
    const action = {
      type: "NEXT"
    };
    const stateAfter = {
      entries: ["Inception"],
      vote: {
        pair: ["Trainspotting", "Wolf of Wall Street"]
      }
    };

    expect(entries(stateBefore, action)).toEqual(stateAfter);
  });

  it("returns both candidates if tied", () => {
    const stateBefore = {
      entries: ["Trainspotting", "Wolf of Wall Street", "Mr. Bean", "Shrek"],
      vote: {
        pair: ["Inception", "Lord of the Rings"],
        tally: { Inception: 12, "Lord of the Rings": 12 }
      }
    };
    const action = {
      type: "NEXT"
    };
    const stateAfter = {
      entries: ["Mr. Bean", "Shrek", "Inception", "Lord of the Rings"],
      vote: {
        pair: ["Trainspotting", "Wolf of Wall Street"]
      }
    };

    expect(entries(stateBefore, action)).toEqual(stateAfter);
  });

  it("returns winner when entries has one entry", () => {
    const stateBefore = {
      entries: [],
      vote: {
        pair: ["Inception", "Lord of the Rings"],
        tally: { Inception: 11, "Lord of the Rings": 12 }
      }
    };
    const action = {
      type: "NEXT"
    };

    const stateAfter = {
      winner: "Lord of the Rings"
    };

    expect(entries(stateBefore, action)).toEqual(stateAfter);
  });

  it("handles a round", () => {
    const actions = [
      { type: "SET_ENTRIES", entries: ["Shrek 2", "Harry Potter"] },
      { type: "NEXT" },
      { type: "VOTE", entry: "Harry Potter" },
      { type: "VOTE", entry: "Harry Potter" },
      { type: "VOTE", entry: "Harry Potter" },
      { type: "NEXT" }
    ];
    const stateAfter = { winner: "Harry Potter" };

    const state = actions.reduce(entries, {});
    expect(state).toEqual(stateAfter);
  });
});
