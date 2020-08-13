"use strict";
var express = require("express");
var socket = require("socket.io");
//app
var app = express();
var server = app.listen(4000, function () {
  console.log("Listening to requests on port 4000");
});

//static files
app.use(express.static("public"));

//socket setup
var io = socket(server);

io.on("connection", function (client) {
  console.log("made a socket connection with: ", client.id);

  client.on("chat", function (data) {
    io.sockets.emit("chat", data);
  });

  client.on("typing", function (data) {
    client.broadcast.emit("typing", data);
  });
});
