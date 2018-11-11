import entries from "./reducers/entries";
import { createStore } from "redux";

describe("store", () => {
  it("integrates with reducer", () => {
    const store = createStore(entries);
    const action = {
      type: "SET_ENTRIES",
      entries: ["Trainspotting", "The Ring"]
    };
    const stateAfter = {
      entries: action.entries
    };
    store.dispatch(action);
    expect(store.getState()).toEqual(stateAfter);
  });
});
