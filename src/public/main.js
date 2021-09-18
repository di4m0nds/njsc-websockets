// Get values from form
const formContent = document.querySelector('#noteForm')
const title = document.querySelector('#title')
const descrip = document.querySelector('#description')

formContent.addEventListener('submit', (e) => {
  // this cancels the default page reload ...
  e.preventDefault()
  console.log(`Title: ${title.value}`)
  console.log(`Description: ${descrip.value}`)

  savenote(title.value, descrip.value)
})
