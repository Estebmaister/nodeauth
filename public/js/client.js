/*global io*/
var socket = io();

// Reception socket for 'user' when connect or disconnect
socket.on("user", (data) => {
  // Showing number of users online
  document.querySelector("#num-users").innerHTML =
    data.currentUsers + " users online";
  if (data.currentUsers == 1)
    document.querySelector("#num-users").innerHTML =
      data.currentUsers + " user online";

  // Showing message in the chat when a user connect or disconnect
  let message = data.name;
  if (data.connected) message += " has joined the chat.";
  if (!data.connected) message += " has left the chat.";
  const listItem = document.createElement("li");
  listItem.innerHTML = "<b>" + message + "</b>";
  document.querySelector("#messages").appendChild(listItem);
});

// Reception socket for 'user count'
socket.on("user count", (data) => console.log(data));

// Reception socket for 'chat message'
socket.on("chat message", (data) => {
  console.log(data);
  const listItem = document.createElement("li");
  listItem.innerHTML = `${data.name}: ${data.message}`;
  document.querySelector("#messages").appendChild(listItem);
});

// Form submission with new message in field with id 'message-input'
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("submitting");
  socket.emit("chat message", document.querySelector("#message-input").value);
  document.querySelector("#message-input").value = "";
  return false; // prevent form submit from refreshing page
});
