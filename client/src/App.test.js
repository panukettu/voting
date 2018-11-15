import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore } from "redux";
import reducer from "./reducers/reducer";
import { Provider } from "react-redux";

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
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
