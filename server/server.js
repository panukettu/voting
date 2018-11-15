import Server from "socket.io";

export default function startServer(store) {
  const io = Server().attach(8090);

  store.subscribe(() => {
    io.emit("state", store.getState());
    console.groupCollapsed("DISPATCH ---");
    console.log("store.getState()", store.getState());
    console.groupEnd();
  });

  io.on("connection", socket => {
    socket.emit("state", store.getState());
    socket.on("action", store.dispatch.bind(store));
  });
}
