const conn = io();

// Just for understand . . .
// Listen "Ping" from backend
conn.on('ping', () => {
	console.log('Listening . . .');
	// Sent "Pong" to backend
	conn.emit('pong');
});

// 31:44
