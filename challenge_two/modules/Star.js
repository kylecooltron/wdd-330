import { line_dist } from "./functions.js";


const starImg = "images/star.png";
const starImgWidth = 100;

export class StarController {
  constructor(gameController, parentElement){
    this.gameController = gameController;
    this.parentElement = parentElement;
    this.starDict = {};
    this.uniqueID = 0;
  }

  getUniqueID(){
    let id = this.uniqueID;
    this.uniqueID ++;
    return id;
  }

  createStars(patternList){
    patternList.forEach(element => {
      let new_id = this.getUniqueID();
      this.starDict[new_id] = new Star(
        this,
        this.parentElement,
        {x: element.x, y: element.y},
        new_id,
      );
    });
  }

  removeStar(star_ID){
    if(this.starDict.hasOwnProperty(star_ID)){
      delete this.starDict[star_ID];
    }
    if(Object.entries(this.starDict).length == 0){
      this.lastStarRemoved();
    }
  }

  lastStarRemoved(){
    this.gameController.lastStarFaded();
  }

  mouseCheck(line_points){
    for(let key in this.starDict){
      let star = this.starDict[key];
      if(star.get_state() == "spinning"){
        // for every point in the line
        for(let i=0;i<line_points.length; i++){
          let point = line_points[i];
          let dist = line_dist(
            point.x,
            point.y,
            star.get_x(),
            star.get_y(),
          )
          // see if it's close to star
          if(dist <= 40){
            star.explodeStar();
            this.gameController.addPoints(100);
            //stop searching
            break;
          }
        }
      }
    }
  }





}


export class Star {

  constructor(
    starController,
    parentElement,
    destination, 
    star_ID, 
    fadespeed = 5000
  ) {
    this.starController = starController;
    this.parentElement = parentElement;
    this.destination = destination;
    this.star_ID = star_ID;
    this.position = this.destination;
    this.state = "organizing";
    this.fadespeed = fadespeed;
    this.init();
  }
  // Notes:
  // destination may be used later to create animating effect when stars
  // first appear

  init(){
    // create image element
    this.container_div = document.createElement("div");
    this.element = document.createElement("img");
    this.element.classList.add("star", "star-creating");
    this.element.src=starImg;
    const rect = this.parentElement.getBoundingClientRect()
    this.element.style.left = rect.left + this.position.x - (starImgWidth * 0.5) + "px";
    this.element.style.top = rect.top + this.position.y - (starImgWidth * 0.5) + "px";
    // disable mouse interaction
    this.element.setAttribute("unselectable", "on");
    this.element.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    })
    // add animation events
    this.element.addEventListener("animationend", (event) =>{
      if(event.animationName == "star-creating"){
        this.element.classList.remove("star-creating");
        this.element.classList.add("star-spinning");
        // set container div to fade at certain rate
        this.container_div.classList.add("star-fading");
        this.container_div.style["animation-duration"] = this.fadespeed + "ms";
        this.container_div.addEventListener("animationend", (e) => {
          if(e.animationName == "star-fading"){
            this.removeStar();
          }
        })
        // set the new state
        this.state = "spinning";
      }
      if(event.animationName == "star-exploding"){
        this.removeStar();
      }
    })
    // append to game element
    this.container_div.appendChild(this.element);
    this.parentElement.appendChild(this.container_div);
  }

  get_x(){
    const rect = this.parentElement.getBoundingClientRect()
    return rect.left + this.position.x;
  }
  get_y(){
    const rect = this.parentElement.getBoundingClientRect()
    return rect.top + this.position.y;
  }
  get_position(){
    return this.position;
  }
  get_state(){
    return this.state;
  }

  removeStar(){
    this.starController.removeStar(this.star_ID);
    this.container_div.remove();
  }

  explodeStar(){
    this.state = "exploding";
    this.container_div.classList.remove("star-fading");
    this.container_div.style.opacity = 1;
    this.element.classList.remove("star-spinning");
    this.element.classList.add("star-exploding");
  }

}