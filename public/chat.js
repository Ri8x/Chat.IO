"use strict";

//Make Connection
let socket = io.connect("http://localhost:4000");
//querry Dom

var message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  btn = document.getElementById("send"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback");

//Emit Events

btn.addEventListener("click", function () {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
  });
});

message.addEventListener("keypress", function () {
  socket.emit("typing", {
    isTyping: true,
    user: handle.value,
  });
});

message.addEventListener("keyup", function () {
  socket.emit("typing", {
    isTyping: false,
    user: handle.value,
  });
});

//listen for events

socket.on("chat", function (data) {
  message.value = "";
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

socket.on("typing", function (data) {
  if (data.isTyping) {
    clearTimeout(typingTimeout);
    feedback.innerHTML = `<p><em>${data.user} is typing...</em></p>`;
  } else
    var typingTimeout = setTimeout(function () {
      feedback.innerHTML = "";
    }, 2000);
});
