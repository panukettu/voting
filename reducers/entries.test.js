const { entries } = require("./entries");

describe("entries", () => {
  it("it sets entries", () => {
    const stateBefore = [];
    const action = {
      type: "ADD_ENTRIES",
      payload: ["Inception", "Lord of the Rings"]
    };
    const stateAfter = [...action.payload];

    expect(entries(stateBefore, action)).toEqual(stateAfter);
  });
});
