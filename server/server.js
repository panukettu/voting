import Server from "socket.io";
const port = process.env.port || 5000;
export default function startServer(store) {
  const io = Server().attach(port);

  store.subscribe(() => {
    io.emit("state", store.getState());
    console.groupCollapsed("SENDING STATE TO CLIENTS: ");
    console.log("state: ", store.getState());
    console.groupEnd();
  });

  io.on("connection", socket => {
    socket.emit("state", store.getState());
    socket.on("action", store.dispatch.bind(store));
  });
}
