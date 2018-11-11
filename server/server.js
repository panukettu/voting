import Server from "socket.io";

export default function startServer(store) {
  const io = Server().attach(8090);

  store.subscribe(() => {
    io.emit("state", store.getState());
  });

  io.on("connection", socket => {
    socket.emit("state", store.getState());
    socket.on("action", store.dispatch.bind(store));
  });
}
