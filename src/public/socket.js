const socket = io.connect();

// Just for understand the connection
// Listen "Ping" from backend
socket.on('ping', () => {
	console.log('Listening . . .');

	// Sent "Pong" to backend
	socket.emit('pong');
});

const savenote = (title, description) => {
	socket.emit('client:pushnote', {
		title,
		description,
	});
};

socket.on('server:sendarray', addnote);
