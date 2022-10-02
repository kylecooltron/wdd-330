
function followMouse(event){
  this.style.top = e.pageY;
}

const homeBase = document.querySelector(".home-base");
const elementsList = [];

function inHomeBase(element){
    if(parseInt(element.style.left) + element.offsetWidth <= 150){
      if(parseInt(element.style.top) + element.offsetHeight <= 150){
        return true;
      }
    }
  return false;
}


window.addEventListener('load', (event) => {
  
  const parentDiv = document.querySelector(".parent-element");
  const childrenToMake = 10;
  const childrenTypes = ["p","a","b","h2","h3","button","div"];

  for(let i=0; i<childrenToMake; i++){
    let randomType = childrenTypes[Math.floor(Math.random() * childrenTypes.length)];
    let element = document.createElement(randomType);
    element.classList.add("child-element");
    element.style.left = (Math.random() * (parentDiv.offsetWidth*0.9)) + "px";
    element.style.top = (Math.random() * (parentDiv.offsetHeight*0.9)) + "px";
    element.innerHTML = element.tagName;
    element.style.fontSize = "25px";
    parentDiv.appendChild(element);

    while(inHomeBase(element)){
      element.style.left = (Math.random() * (parentDiv.offsetWidth*0.9)) + "px";
      element.style.top = (Math.random() * (parentDiv.offsetHeight*0.9)) + "px";
    }

    elementsList.push(element);

    element.addEventListener('click', (event) => {
      event.target.classList.toggle("selected");
      if(element.classList.contains("selected")){
        event.target.style.color = "purple";
      }else{
        event.target.style.color = "black";
      }
    });

    element.addEventListener('mouseout', (event) => {
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
        }
      }
    });


  }
});


