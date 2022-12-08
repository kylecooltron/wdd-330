import { line_dist, angle_between_points } from "./functions.js";


const starImg = "images/star_smaller.png";
const starImgWidth = 48;

export class StarController {
  constructor(gameController, parentElement){
    this.gameController = gameController;
    this.parentElement = parentElement;
    this.starStartCount = 0;
    this.starDict = {};
    this.uniqueID = 0;
    this.missedStars = 0;
    // for determining quality of swipe
    this.star_worth = 50; // starting value
    this.star_dist_allowed = 30;
    this.potential_points = null;
    this.points_earned = null;
  }


  getStarDict(){
    return this.starDict;
  }

  getUniqueID(){
    let id = this.uniqueID;
    this.uniqueID ++;
    return id;
  }

  getStarTotal(){
    // returns how many stars are left and to start
    let stars_left = 0;
    for(let key in this.starDict){
      let star = this.starDict[key];
      if(star.state == "spinning"){
        stars_left += 1;
      }
    }
    return {
      "missed": stars_left,
      "out_of": this.starStartCount,
    }
  }

  getStarStartCount(){
    return this.starStartCount;
  }

  getPointQuality(){
    return this.points_earned / this.potential_points;
  }

  getPointsEarned(){
    return this.points_earned;
  }

  swipeEnded(checkMissed=true){
    // handle missed stars
    if(checkMissed){
      this.gameController.handleMissedStars(
        this.getStarTotal()
      )
    }
    // set remaining stars to fade quickly
    for(let key in this.starDict){
      let star = this.starDict[key];
      if(star.state == "spinning"){
        star.fadeFast();
      }
    }
  }

  instantlyRemoveStars(){
    for(let key in this.starDict){
      let star = this.starDict[key];
        star.removeStar();
    }
  }



  createStars(patternList, fadespeed){
    // set the initial star count
    this.starStartCount = patternList.length;
    // create new stars and add them to dict
    patternList.forEach(element => {
      let new_id = this.getUniqueID();
      this.starDict[new_id] = new Star(
        this,
        this.parentElement,
        {x: element.x, y: element.y},
        new_id,
        fadespeed,
      );
    });
    // set potential points for this round
    this.potential_points = this.starStartCount * this.star_worth;
    // reset points earned
    this.points_earned = 0;
  }

  removeStar(star_ID, faded=false){
    if(this.starDict.hasOwnProperty(star_ID)){
      // if the star was missed
      if(faded){
        this.missedStars += 1;
      }
      delete this.starDict[star_ID];
    }
    if(Object.entries(this.starDict).length == 0){

      this.lastStarRemoved(this.missedStars > 0);
    }
  }

  lastStarRemoved(faded=false){
    this.gameController.lastStarFaded(
      this.missedStars,
      faded
    );
    // reset
    this.missedStars = 0;
  }

  mouseCheck(line_points){
    for(let key in this.starDict){
      let star = this.starDict[key];
      if(star.get_state() == "spinning"){
        // for every point in the line
        for(let i=1;i<line_points.length; i++){
          let point = line_points[i];
          let dist = line_dist(
            point.x,
            point.y,
            star.get_x(),
            star.get_y(),
          )
          
          // see if it's close to star
          if(dist <= this.star_dist_allowed){
            // set star to explode
            star.explodeStar();
            // get hypothetical spot line would cross
            let ang = angle_between_points(
              line_points[i-1].x,
              line_points[i-1].y,
              point.x,
              point.y,
            )
            let projected_point = {
              x: point.x + Math.cos(ang) * dist,
              y: point.y + Math.sin(ang) * dist,
            }
            let projected_dist = line_dist(
              projected_point.x,
              projected_point.y,
              star.get_x(),
              star.get_y(),
            )
            if(dist < this.projected_dist){
              // use original if it's smaller
              this.projected_dist = dist;
            }
            if(this.projected_dist < 9){
              this.projected_dist = 0;
            }
            // calculate point value of star
            let point_value = Math.max(Math.ceil(
              // distance factor
              ((1/this.star_dist_allowed) 
                * (this.star_dist_allowed - Math.max(projected_dist-5,0)))
              // multiplied by current worth
                * this.star_worth
              // cannot be less than ten
            ), 20);
            this.gameController.addPoints(point_value);
            // update points earned this round
            this.points_earned += point_value;
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
    fadespeed
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
        // set to fade out
        this.container_div.addEventListener("animationend", (e) => {
          if(e.animationName == "star-fading"){
            this.removeStar(true);
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

  removeStar(faded=false){
    this.starController.removeStar(this.star_ID,faded);
    this.container_div.remove();
  }

  explodeStar(){
    this.state = "exploding";
    this.container_div.classList.remove("star-fading");
    this.container_div.style.opacity = 1;
    this.element.classList.remove("star-spinning");
    this.element.classList.add("star-exploding");
  }

  fadeFast(){
    // start fading fast
    this.state = "fade-fast";
    let calcOpacity = (window.getComputedStyle(this.container_div).getPropertyValue("opacity"));
    this.container_div.classList.remove("star-fading");
    this.container_div.style.opacity = calcOpacity;
    this.fadeOpacity();
  }

  fadeOpacity(){
    // fade until it disappears
    if(this.container_div.style.opacity > 0){
      this.container_div.style.opacity -= 10 / (this.fadespeed*0.3);
      setTimeout(() => {
        this.fadeOpacity();
      }, 1);
    }else{
      this.removeStar();
    }
  }



}