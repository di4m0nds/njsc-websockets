const noteList = document.querySelector('#notes')

const noteUI = (note) => {
  const div = document.createElement('div')
  div.innerHTML = `
  <div class="card card-body rounded-0 mb-2 animate__animated animate__lightSpeedInRight">
      <div class="d-flex justify-content-between">
          <h1 class="card-title h3">${note.title}</h1>
          <div>
              <button class="btn btn-danger delete" data-id="${note.id}">delete</button>
              <button class="btn btn-secondary update" data-id="${note.id}">update</button>
          </div>
      </div>
      <p>${note.description}</p>
  </div>`

  const btnDelete = div.querySelector('.delete')
  btnDelete.addEventListener('click', () => {
    deleteNote(btnDelete.dataset.id)
  })

  const btnUpdate = div.querySelector('.update')
  btnUpdate.addEventListener('click', () => {
    updateNote(btnUpdate.dataset.id)
  })

  return div
}

const addnotes = (note) => {
  noteList.innerHTML = ''
  console.log(note)
  note.forEach((note) => {
    noteList.append(noteUI(note))
  })
}
