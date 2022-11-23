

const starImg = "images/star.png";
const starImgWidth = 100;

export class StarController {
  constructor(parentElement){
    this.parentElement = parentElement;
    this.starList = []
  }


  createStars(patternList){
    patternList.forEach(element => {
      this.starList.push(
        new Star(this.parentElement, {x: element.x, y: element.y})
      )
    });
  }

}


export class Star {

  constructor(parentElement, destination) {
    this.parentElement = parentElement;
    this.destination = destination;
    this.position = this.destination;
    this.state = "organizing";
    this.init();
  }

  init(){
    // create image element
    this.element = document.createElement("img");
    this.element.classList.add("star");
    this.element.src=starImg;
    const rect = this.parentElement.getBoundingClientRect()
    this.element.style.left = rect.left + this.position.x - (starImgWidth * 0.5) + "px";
    this.element.style.top = rect.top + this.position.y - (starImgWidth * 0.5) + "px";
    this.element.setAttribute("unselectable", "on");
    this.element.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    })
    this.parentElement.appendChild(this.element);

    
    
  }

  get_x(){
    return this.position.x;
  }
  get_y(){
    return this.position.y;
  }

}