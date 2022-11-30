
import {point_dist, angle_between_points, degrees_to_radians} from "./functions.js";

const borderThickness = 60;

export default class Pattern {

  constructor(width, height) {
    this.pattern_array = []
    this.complexity = {
      "count": 10,
      "angle": 150,
      "dist": 90,
    }
    this.width = width;
    this.height = height;
  }

  set_size(width, height){
    this.width = width;
    this.height = height;
  }

  get_pattern_total_length(){
    let dist = 0;
    for(let i=0; i<this.pattern_array.length-1; i++){
      dist += point_dist(
        this.pattern_array[i],
        this.pattern_array[i+1],
      )
    }
    return dist;
  }

  create_pattern(width = this.width, height = this.height){
    this.pattern_array = []

    // set starting point
    let start_point = this.get_random_point();
    // push start point away from center
    if(start_point.x > width*0.25 || start_point.x < width*0.75){
      if(start_point.x < width*0.5){ start_point.x = width*0.25;
      }else{ start_point.x = width*0.75; }
    }
    if(start_point.y > height*0.25 || start_point.y < height*0.75){
      if(start_point.y < height*0.5){ start_point.y = height*0.25;
      }else{ start_point.y = height*0.75; }
    }
    
    // try n times to make a pattern that fits in the screen
    for(let tries=0; tries<200; tries++){
      // add the starting point
      this.pattern_array = [start_point];
      // set starting angle
      let next_angle = this.get_new_angle(
        this.pattern_array.at(-1), { x: width*0.5, y: height*0.5}
      )
      // generate random points
      for(let i=0; i<this.complexity.count-1; i++){
        // push new point to array
        this.pattern_array.push({
          x: this.pattern_array.at(-1).x + Math.cos(next_angle) * this.complexity.dist,
          y: this.pattern_array.at(-1).y + Math.sin(next_angle) * this.complexity.dist,
        });
        // get angle for next point
        next_angle = this.get_new_angle(
          this.pattern_array.at(-2), 
          this.pattern_array.at(-1)
        );
      }

      // check to see if this random pattern fits on the screen
      let points_on_screen = true;
      this.pattern_array.forEach(point => {
        if(point.x < borderThickness || point.y < borderThickness || 
           point.x > width - borderThickness || point.y > height - borderThickness){
          points_on_screen = false;
        }
      });
      // success
      if(points_on_screen){
        break;
      }
    }

    // return the array of points
    return this.pattern_array;
  }

  get_new_angle(from_point, to_point){
    return (
      angle_between_points(
        from_point.x,
        from_point.y,
        to_point.x,
        to_point.y
      ) + degrees_to_radians(
        (Math.random() * this.complexity.angle) - (this.complexity.angle*0.5)
    ))
  }
  
  get_random_point(width = this.width, height = this.height){
    let new_x = borderThickness + (Math.random() * (width - borderThickness * 2));
    let new_y = borderThickness + (Math.random() * (height - borderThickness * 2));
    return {
      x: new_x,
      y: new_y,
    }
  }

  get_pattern(){
    return this.pattern_array;
  }

}