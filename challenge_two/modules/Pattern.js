
import {line_dist, angle_between_points, degrees_to_radians} from "./functions.js";

const borderThickness = 60;

export default class Pattern {

  constructor(width, height) {
    this.pattern_array = []
    this.complexity = {
      "count": 10,
      "angle": 4,
    }
    this.width = width;
    this.height = height;
  }

  set_size(width, height){
    this.width = width;
    this.height = height;
  }

  create_pattern(width = this.width, height = this.height){
    this.pattern_array = []
    let attempt_pattern = [];

    // set starting point
    let start_point = this.get_random_point();
    // push point away from center
    if(start_point.x > width*0.25 || start_point.x < width*0.75){
      if(start_point.x < width*0.5){
        start_point.x = width*0.25;
      }else{
        start_point.x = width*0.75;
      }
    }
    if(start_point.y > height*0.25 || start_point.y < height*0.75){
      if(start_point.x < height*0.5){
        start_point.y = height*0.25;
      }else{
        start_point.y = height*0.75;
      }
    }

    
    
    // try ten times to make a good pattern
    for(let tries=0; tries<10; tries++){
      attempt_pattern = [start_point];

      let next_angle = angle_between_points(
        attempt_pattern.at(-1).x,
        attempt_pattern.at(-1).y,
        width*0.5,
        height*0.5
      ) + degrees_to_radians(
        (Math.random() * this.complexity.angle) - (this.complexity.angle*0.5)
      )

      for(let i=0; i<this.complexity.count-1; i++){
        
        // console.log(attempt_pattern.at(-1));

        let dist = 90;
        let new_x = attempt_pattern.at(-1).x + Math.cos(next_angle) * dist;
        let new_y = attempt_pattern.at(-1).y + Math.sin(next_angle) * dist;

        next_angle = angle_between_points(
          attempt_pattern.at(-1).x,
          attempt_pattern.at(-1).y,
          new_x,
          new_y,
        ) + degrees_to_radians(
          (Math.random() * this.complexity.angle) - (this.complexity.angle*0.5)
        )
        
        attempt_pattern.push(
          {x: new_x, y: new_y}
        )

        
        
      }

      let points_on_screen = true;
      attempt_pattern.forEach(point => {
        if(point.x < borderThickness || point.y < borderThickness){
          points_on_screen = false;
        }
        if(point.x > width - borderThickness || point.y > height - borderThickness){
          points_on_screen = false;
        }
      });

      if(points_on_screen){
        console.log(attempt_pattern);
        break;
      }

    }

    this.pattern_array = attempt_pattern;
    // for(var i=0; i<this.complexity.count; i++){
    //   let new_x = borderThickness + (Math.random() * (width - borderThickness * 2));
    //   let new_y = borderThickness + (Math.random() * (height - borderThickness * 2));

    //   this.pattern_array.push({x:new_x, y:new_y})
    // }



    return this.pattern_array;
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