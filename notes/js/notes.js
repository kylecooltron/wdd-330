
const populate_weekly_notes = () => {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const week = urlParams.get('week')

  // get elements
  const h2_title = document.querySelector(".notes-title")
  const p_weekly_notes = document.querySelector(".weekly-notes")

  h2_title.textContent = `Week ${week}`

  fetch(`week${week}.txt`)
  .then(response => response.text())
  .then((data) => {
    console.log(data)
    p_weekly_notes.innerHTML = data
  })

}

document.onload = populate_weekly_notes()
