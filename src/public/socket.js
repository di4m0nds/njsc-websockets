const socket = io.connect()

// Just for understand the connection
// Listen "Ping" from backend
socket.on('ping', () => {
  console.log('Listening . . .')

  // Sent "Pong" to backend
  socket.emit('pong')
})

/**
 * Save notes
 * @param {string} title
 * @param {string} description
 */
const savenote = (title, description) => {
  socket.emit('client:pushnote', {
    title,
    description
  })
}

const deleteNote = (id) => {
  console.log(id)
  socket.emit('client:deletenote', id)
}

const updateNote = (id) => {
  socket.emit('client:updatenote', id)
}

socket.on('server:loadnotes', addnotes)

socket.on('server:sendarray', addnotes)

socket.on('server:selectednote', (note) => {
  console.log(note)
  const t = document.querySelector('#title')
  const d = document.querySelector('#description')

  t.value = note.title
  d.value = note.description

  deleteNote(note.id)
})
