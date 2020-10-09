const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
let users = [];
let connections = [];
let toggleValue;

server.listen(process.env.PORT || 5000);

io.sockets.on("connection", function (socket) {
  connections.push(socket);
  console.log("Connected: %s sockets connected", connections.length);

  //Disconnect
  socket.on("disconnect", (data) => {
    users.splice(users.indexOf(socket.username), 1);
    updateUsernames();
    connections.splice(connections.indexOf(socket), 1);
    console.log("Disconnected: %s sockets connected", connections.length);
  });

  socket.on("set toggle", (data) => {
    toggleValue = data;
    io.sockets.emit("new value", data);
  });

  io.sockets.emit("get value", toggleValue);

  const updateUsernames = () => {
    io.sockets.emit("get users", users);
  };
});
