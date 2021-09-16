import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { Server as WebSocketServer } from 'socket.io';
import http from 'http';

const app = express();
const httpServer = http.createServer(app);
const io = new WebSocketServer(httpServer);

// Here, if u use eslint, add into .eslintrc env -> node: true
dotenv.config();
app.set('port', process.env.PORT_SERVER || 4000);

// Set where is my public folder
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
	console.log('New Connection: ', socket.id);

	// Sent "Ping" to Client
	socket.emit('ping');

	// Recept "Pong" of Client
	socket.on('pong', () => {
		console.log('Pong . . .');
	});
});

// Run a server here
httpServer.listen(app.get('port'));
console.log(`Server is open in port: ${app.get('port')}`);
