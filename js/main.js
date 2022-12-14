
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
    active: "true",
    assignments: [
      {
        label: "Week 4 notes",
        url: "notes/notes.html?week=4",
      },
      {
        label: "Messing with forms",
        url: "week4/week4.html",
      },
    ]
  },
  {
    week: "Week 5",
    active: "true",
    assignments: [
      {
        label: "Week 5 notes",
        url: "notes/notes.html?week=5",
      },
      {
        label: "Debugging and Testing",
        url: "week5/week5.html",
      },
      {
        label: "ToDo App",
        url: "challenge_one/index.html",
      },
    ]
  },
  {
    week: "Week 6",
    active: "true",
    assignments: [
      {
        label: "Week 6 notes",
        url: "notes/notes.html?week=6",
      },
      {
        label: "ToDo App",
        url: "challenge_one/index.html#",
      },
    ]
  },
  {
    week: "Week 7",
    active: "true",
    assignments: [
      {
        label: "Week 7 notes",
        url: "notes/notes.html?week=7",
      },
      {
        label: "Team Assignment",
        url: "week7/Team/index.html",
      },
    ]
  },
  {
    week: "Week 8",
    active: "true",
    assignments: [
      {
        label: "Week 8 notes",
        url: "notes/notes.html?week=8",
      },
      {
        label: "Expirementing with transform and canvas",
        url: "week8/week8.html",
      },
      {
        label: "Team Assignment",
        url: "week8/team/index.html",
      },
    ]
  },
  {
    week: "Week 9",
    active: "true",
    assignments: [
      {
        label: "Week 9 notes",
        url: "notes/notes.html?week=9",
      },
      {
        label: "Team assignment - team version",
        url: "week9/team/team_version/team.html",
      },
      {
        label: "Team assignment - kyle's expirement version",
        url: "week9/team/kyle_expirement/index-START.html",
      },
      {
        label: "kyle's annoying expirement",
        url: "week9/annoying/index.html",
      },
      {
        label: "Challenge Two - Star Swiper Skeleton",
        url: "challenge_two/index.html",
      },
    ]
  },
  {
    week: "Week 10",
    active: "true",
    assignments: [
      {
        label: "Week 10 notes",
        url: "notes/notes.html?week=10",
      },
      {
        label: "Team assignment",
        url: "week10/team/index.html",
      },
      {
        label: "Challenge Two - Star Swiper Boiler Plate",
        url: "challenge_two/index.html",
      },
      
    ]
  },
  {
    week: "Final Project",
    active: "true",
    assignments: [
      {
        label: "Challenge Two - Star Swiper",
        url: "challenge_two/index.html",
      },
    ]
  },
  {
    week: "Self Evaluation Video",
    active: "true",
    assignments: [
      {
        label: "Video Link",
        url: "https://youtu.be/DqqQuUOZC7w",
      }
    ]
  }
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
