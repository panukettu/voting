import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore } from "redux";
import reducer from "./reducers/reducer";

const store = createStore(reducer);
store.dispatch({
  type: "SET_STATE",
  state: {
    vote: {
      pair: ["Sunshine", "28 Days Later"],
      tally: { Sunshine: 2 }
    }
  }
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App store={store} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
