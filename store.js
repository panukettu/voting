import { createStore } from "redux";
import entries from "./reducers/entries";
const store = createStore(entries);
export default store;
