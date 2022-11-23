

const borderThickness = 60;

export default class Pattern {

  constructor(width, height) {
    this.pattern_array = []
    this.complexity = {
      "count": 10,
      "angle": 20,
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
    for(var i=0; i<this.complexity.count; i++){
      let new_x = borderThickness + (Math.random() * (width - borderThickness * 2));
      let new_y = borderThickness + (Math.random() * (height - borderThickness * 2));

      this.pattern_array.push({x:new_x, y:new_y})
    }
    return this.pattern_array;
  }

  get_pattern(){
    return this.pattern_array;
  }

}