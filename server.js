const express = require("express"),
  path = require("path"),
  app = express(),
  http = require("http").Server(app),
  io = require("socket.io")(http),
  port = process.env.PORT || 5000;

export default function startServer(store) {
  /**
|--------------------------------------------------
| User opens the site
|--------------------------------------------------
*/
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

  if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "/client/build")));
    // Handle React routing, return all requests to React app
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
  }

  http.listen(port, () => console.log(`Listening on port ${port}`));
}
