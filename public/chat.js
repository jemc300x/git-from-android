const socket = io();

let message = document.getElementById('message');
let output = document.getElementById('output');
let btn = document.getElementById('send');
let actions = document.getElementById('actions');
let username = document.getElementById('username');

btn.addEventListener('click', () => {
	socket.emit('chat:message', {
		message: message.value,
		username: username.value
	});
});

message.addEventListener('keypress', () => {
	socket.on('chat:typing', username.value);
});

socket.on('chat:message', (data) => {
	let date = new Date().toLocaleString();
	output.innerHTML += `<p>${date}
	<strong>${data.username}</strong>: ${data.message}
	</p>`
});

socket.on('chat:typing', (data) => {
	actions.innerHTML = `<p><em>${data}</em> is typing a message</p>`
});
