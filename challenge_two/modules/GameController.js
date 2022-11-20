
import Canvas from './Canvas.js';

export default class GameController {

  constructor(parent) {
    this.parent = parent;
    this.parentElement = null;
    this.canvasController = null;
  }

  // accessors - - - - - - -

  // helpers - - - - - - - -

  initController(){
   
    this.parentElement = document.querySelector(this.parent);
    this.canvasController = new Canvas(this.parentElement);
    const canvas = this.canvasController.createCanvas();

    canvas.addEventListener("click", (e) =>{
      let startPoint = {
        x: 100,
        y: 80,
      };
      let endPoint = {
        x: 150,
        y: 200,
      };
      this.canvasController.drawLine(startPoint, endPoint);
    })

  }


}