import startServer from "./server";
import store from "./store";
import entries from "./entries.json";

export default store;
startServer(store);
console.log("server started");

console.log(`starting with ${entries.length} entries`);

store.dispatch({ type: "SET_ENTRIES", entries });
store.dispatch({ type: "NEXT" });

console.log(store.getState());