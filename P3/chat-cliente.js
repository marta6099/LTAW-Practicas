//-- Elementos del interfaz
const display = document.getElementById("display");
const msg_entry = document.getElementById("msg_entry");
const usernameInput = document.getElementById("username");

//Constante sonido
let audio = new Audio('sonido.mp3');

//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();
let user = "";

usernameInput.onchange = () => {
  if (usernameInput.value) {
    user = usernameInput.value;
    console.log(user);
    socket.send("Se ha registrado:  " + user);
  }
  usernameInput.value = "";
}

let typing = false;
let timeout = undefined;

msg_entry.addEventListener('keydown', () => {
  if (!typing) {
    typing = true;
    socket.emit('typing', user);
  }
  clearTimeout(timeout);
});

msg_entry.addEventListener('keyup', () => {
  timeout = setTimeout(() => {
    typing = false;
    socket.emit('stopTyping', user);
  }, 2000);
});

socket.on("message", (msg)=>{
  if (msg.includes(user)) {
    const messageBox = document.createElement("div");
    messageBox.classList.add("message-box");
    messageBox.classList.add("own-message");
    messageBox.innerHTML = `<p>${msg}</p>`;
    display.appendChild(messageBox);
  } else if (msg.includes('is typing')) {
    const messageBox = document.createElement("div");
    messageBox.classList.add("message-box");
    messageBox.innerHTML = `<p>${msg}</p>`;
    messageBox.id = 'typing-msg';
    display.appendChild(messageBox);
  } else {
    const messageBox = document.createElement("div");
    messageBox.classList.add("message-box");
    messageBox.innerHTML = `<p>${msg}</p>`;
    display.appendChild(messageBox);
    const typingMsg = document.getElementById('typing-msg');
    if (typingMsg) {
      display.removeChild(typingMsg);
    }
  }
});

//-- Al apretar el botón se envía un mensaje al servidor
msg_entry.onchange = () => {
  if (msg_entry.value) {
    if (!user) {
      user = "Anónimo";
    }
    socket.send(`${user}: ${msg_entry.value}`);
    audio.play();
  }

  //-- Borrar el mensaje actual
  msg_entry.value = "";
}
