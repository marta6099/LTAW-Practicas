//-- Elementos del interfaz
const display = document.getElementById("display");
const msg_entry = document.getElementById("msg_entry");
const usernameInput = document.getElementById("username");

//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();
let user = "";

usernameInput.onchange = () => {
  if (usernameInput.value) {
    user = usernameInput.value;
    console.log(user);
  }
}

socket.on("message", (msg)=>{
  if (msg.includes(user)) {
  const messageBox = document.createElement("div");
  messageBox.classList.add("message-box");
  messageBox.classList.add("own-message");
  messageBox.innerHTML = `<p>${msg}</p>`;
  display.appendChild(messageBox);
  //display.innerHTML += '<p style="color:blue">' + msg + '</p>';
} else {
  const messageBox = document.createElement("div");
  messageBox.classList.add("message-box");
  messageBox.innerHTML = `<p>${msg}</p>`;
  display.appendChild(messageBox);
}
});

//-- Al apretar el botón se envía un mensaje al servidor
msg_entry.onchange = () => {
  
  if (msg_entry.value && user)
    socket.send(`${user}: ${msg_entry.value}`);
    //socket.send(msg_entry.value);
  
  //-- Borrar el mensaje actual
  msg_entry.value = "";
}