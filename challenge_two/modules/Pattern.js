


export default class Pattern {

  constructor(width, height) {
    this.pattern_array = []
    this.complexity = {
      "count": 3,
      "angle": 20,
    }
    this.width = width;
    this.height = height;
  }

  set_size(width, height){
    this.width = width;
    this.height = height;
  }

  new_pattern(width, height){
    this.pattern_array = []
    for(var i=0; i<this.complexity.count; i++){ 
      this.pattern_array.push({x:Math.random() * width, y:Math.random() * height})
    }
    return this.pattern_array;
  }

  get_pattern(){
    return this.pattern_array;
  }

}