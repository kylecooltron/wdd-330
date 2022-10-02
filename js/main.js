
const links = [
  {
    week: "Week 1",
    active: "true",
    assignments: [
      {
        label: "Week 1 notes",
        url: "notes/notes.html?week=1",
      },
      {
        label: "Doing Stuff w/ Things - local storage",
        url: "week1/story.html",
      },
    ]
  },
  {
    week: "Week 2",
    active: "true",
    assignments: [
      {
        label: "Week 2 notes",
        url: "notes/notes.html?week=2",
      },
      {
        label: "Calculator Delux - messing with strings and functions",
        url: "week2/week2.html",
      },
    ]
  },
  {
    week: "Week 3",
    active: "true",
    assignments: [
      {
        label: "Week 3 notes",
        url: "notes/notes.html?week=3",
      },
      {
        label: "Event handlers and arrays activity.",
        url: "week3/week3.html",
      },
    ]
  },
  {
    week: "Week 4",
    active: "false",
    assignments: [
      {
        label: "Week 4 notes",
        url: "notes/notes.html?week=4",
      },
      {
        label: "upcoming assignment",
        url: "#",
      },
    ]
  },
  {
    week: "Week 5",
    active: "false",
    assignments: [
      {
        label: "Week 5 notes",
        url: "notes/notes.html?week=5",
      },
      {
        label: "upcoming assignment",
        url: "#",
      },
    ]
  },
  {
    week: "Week 6",
    active: "false",
    assignments: [
      {
        label: "Week 6 notes",
        url: "notes/notes.html?week=6",
      },
      {
        label: "upcoming assignment",
        url: "#",
      },
    ]
  },
  {
    week: "Week 7",
    active: "false",
    assignments: [
      {
        label: "Week 7 notes",
        url: "notes/notes.html?week=7",
      },
      {
        label: "upcoming assignment",
        url: "#",
      },
    ]
  },
  {
    week: "Week 8",
    active: "false",
    assignments: [
      {
        label: "Week 8 notes",
        url: "notes/notes.html?week=8",
      },
      {
        label: "upcoming assignment",
        url: "#",
      },
    ]
  },
  {
    week: "Week 9",
    active: "false",
    assignments: [
      {
        label: "Week 9 notes",
        url: "notes/notes.html?week=9",
      },
      {
        label: "upcoming assignment",
        url: "#",
      },
    ]
  },
  {
    week: "Week 10",
    active: "false",
    assignments: [
      {
        label: "Week 10 notes",
        url: "notes/notes.html?week=10",
      },
      {
        label: "upcoming assignment",
        url: "#",
      },
    ]
  },
  {
    week: "Week 11",
    active: "false",
    assignments: [
      {
        label: "Week 11 notes",
        url: "notes/notes.html?week=11",
      },
      {
        label: "upcoming assignment",
        url: "#",
      },
    ]
  },
  {
    week: "Week 12",
    active: "false",
    assignments: [
      {
        label: "Week 12 notes",
        url: "notes/notes.html?week=12",
      },
      {
        label: "upcoming assignment",
        url: "#",
      },
    ]
  },
  {
    week: "Week 13",
    active: "false",
    assignments: [
      {
        label: "Week 13 notes",
        url: "notes/notes.html?week=13",
      },
      {
        label: "upcoming assignment",
        url: "#",
      },
    ]
  },
  {
    week: "Week 14",
    active: "false",
    assignments: [
      {
        label: "Week 14 notes",
        url: "notes/notes.html?week=14",
      },
      {
        label: "upcoming assignment",
        url: "#",
      },
    ]
  },
]

const populate_assignments_list = () => {

  const ol_assignment_list = document.querySelector(".assignment-list")

  const create_assignments = (link) => {
    htmlText_assignments = ""
        for(let assignment of link.assignments){
          htmlText_assignments += 
          ` <li active=${"false" && assignment.label!="upcoming assignment"}>
              <a href="${assignment.url}">
                ${assignment.label}
              </a>
            </li>`
        }
    return htmlText_assignments
  }

  for(let link of links){
    li = `<li active=${link.active}>
            ${link.week}
            <ul>
            ${create_assignments(link)}
            </ul>
          </li>
    `
    ol_assignment_list.innerHTML += li
  }

}
  

document.onload = populate_assignments_list()
