import startServer from "./server";
import store from "./store";

export default store;
startServer(store);
console.log("-- Voting server started");
