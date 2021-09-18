import express from 'express'
import { Server as WebSocketServer } from 'socket.io'
import http from 'http'
import path from 'path'
import dotenv from 'dotenv'
// Generate a id
import { v4 as uuidV4 } from 'uuid'

// Server Variables
const app = express()
const httpServer = http.createServer(app)
const io = new WebSocketServer(httpServer)

// Extras Varibles
let notes = []

// Here, if u use eslint, add into .eslintrc env -> node: true
dotenv.config()
app.set('port', process.env.PORT_SERVER || 4000)

// Set Default Folder [ public/ , ... ]
app.use(express.static(path.join(__dirname, 'public')))

// Connection with Client
io.on('connection', (socket) => {
  console.log('New Connection: ', socket.id)

  // Sent "Ping" to Client
  socket.emit('ping')

  // Recept "Pong" of Client
  socket.on('pong', () => {
    console.log('Pong . . .')
  })

  socket.emit('server:loadnotes', notes)

  // Create a note
  socket.on('client:pushnote', (data) => {
    notes.push({
      id: uuidV4(),
      ...data
    })
    io.emit('server:sendarray', notes)
  })

  // Delete a note
  socket.on('client:deletenote', (id) => {
    console.log(id)
    notes = notes.filter((note) => note.id !== id)
    console.log(notes)
    io.emit('server:loadnotes', notes)
  })

  // Update a note
  socket.on('client:updatenote', (id) => {
    console.log(id)
    const note = notes.find((notes) => notes.id === id)
    console.log(note)
    socket.emit('server:selectednote', note)
  })
})

// Run a server here
httpServer.listen(app.get('port'))
console.log(`Server is open in port: ${app.get('port')}`)

// 56:00
