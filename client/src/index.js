import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware } from "redux";
import remoteActionMiddleware from "./remoteActionMiddleware";
import reducer from "./reducers/reducer";
import { Provider } from "react-redux";
import io from "socket.io-client";

import { setState } from "./actionCreators";
import { loadState, saveState } from "./localStorage";

const socket = io(
  `${window.location.protocol}//${window.location.hostname}:5000`
);

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(store => createStore(store, loadState()));
const store = createStoreWithMiddleware(reducer);
store.subscribe(() => {
  console.log("set state");
  saveState(store.getState());
});
socket.on("state", state => store.dispatch(setState(state)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
