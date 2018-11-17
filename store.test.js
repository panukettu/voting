import entries from "./reducers/entries";
import { createStore } from "redux";

describe("store", () => {
  let store;
  let d;
  let state;
  beforeEach(() => {
    store = createStore(entries);
    d = action => store.dispatch(action);
    state = store.getState;
  });

  it("integrates with reducer", () => {
    const action = {
      type: "SET_ENTRIES",
      entries: ["Trainspotting", "The Ring"]
    };
    const stateAfter = {
      entries: action.entries,
      voteStarted: true
    };
    d(action);
    expect(state()).toEqual(stateAfter);
  });

  it("allows empty initialization", () => {
    const action = {
      type: "SET_ENTRIES",
      entries: ["Trainspotting", "The Ring"]
    };
    const stateAfter = {
      entries: action.entries,
      voteStarted: true
    };
    d(action);
    expect(state()).toEqual(stateAfter);
  });
});
