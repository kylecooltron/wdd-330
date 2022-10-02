

const homeBase = document.querySelector(".home-base");
const elementsList = [];

function inHomeBase(element){
    if(parseInt(element.style.left) + element.offsetWidth <= 210){
      if(parseInt(element.style.top) + element.offsetHeight <= 210){
        return true;
      }
    }
  return false;
}


window.addEventListener('load', (event) => {
  
  const parentDiv = document.querySelector(".parent-element");
  const childrenToMake = 4;
  const childrenTypes = ["p","a","b","h2","h3","button","div"];

  for(let i=0; i<childrenToMake; i++){
    let randomType = childrenTypes[Math.floor(Math.random() * childrenTypes.length)];
    let element = document.createElement(randomType);
    element.classList.add("child-element");
    element.style.left = (Math.random() * (parentDiv.offsetWidth*0.8)) + "px";
    element.style.top = (Math.random() * (parentDiv.offsetHeight*0.8)) + "px";
    element.textContent = `<${element.tagName}>`;
    element.style.fontSize = "25px";
    parentDiv.appendChild(element);

    while(inHomeBase(element)){
      element.style.left = (Math.random() * (parentDiv.offsetWidth*0.8)) + "px";
      element.style.top = (Math.random() * (parentDiv.offsetHeight*0.8)) + "px";
    }

    elementsList.push(element);


    const clickEvent = (event) => {
      event.target.classList.toggle("selected");
      if(element.classList.contains("selected")){
        event.target.style.color = "purple";
      }else{
        event.target.style.color = "black";
      }
    }

    const mouseOutEvent = (event) => {
      // highlight the mouseenter target
      if(event.target.classList.contains("selected")){
        let x_pos = event.clientX - (parentDiv.getBoundingClientRect().left + window.scrollX);
        let y_pos = event.clientY - (parentDiv.getBoundingClientRect().top + window.scrollY);
        event.target.style.left = x_pos - (event.target.offsetWidth*0.5)  + "px";
        if(["H2","H3","P"].includes(event.target.tagName)){
          y_pos -= 20;
        }
        event.target.style.top = y_pos - (event.target.offsetHeight*0.5) + "px";

        let allIn = true;
        for(el of elementsList){
          if (!inHomeBase(el)){
            allIn = false;
          }
        }
        if(allIn == true){
          homeBase.style.backgroundColor = "aqua";
          homeBase.textContent = "GREAT WORK!";

          for(el of elementsList){
            el.classList.remove("selected");
            el.removeEventListener('click',clickEvent);
            el.removeEventListener('mouseout',mouseOutEvent);
          
          el.style.color = "white";
          }

        }
      }
    }

    element.addEventListener('click', clickEvent);
    element.addEventListener('mouseout', mouseOutEvent);


  }
});

document.addEventListener('keypress', (event) => console.log(`You pressed the ${event.key} character`));


ulElement = document.getElementById('list');
liElement = document.querySelector('#list li');
// capturing
ulElement.addEventListener('click', (event) =>
console.log('Clicked on ul (parent fires event first)'),true);

liElement.addEventListener('click', (event) =>
console.log('Clicked on li'),true);

