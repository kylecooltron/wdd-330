  // Game View handler

  export default class Canvas {

    constructor(parentElement){
      this.parentElement = parentElement;
      this.canvas = null;
      this.offset = null;
      this.ctx = null;
    }

    createCanvas(){
      if(this.canvas != null){
        this.canvas.remove();
        this.ctx = null;
      }
      const width = this.parentElement.offsetWidth;
      const height = this.parentElement.offsetHeight;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      this.parentElement.append(canvas);
      this.canvas = canvas;
      this.offset = canvas.getBoundingClientRect();
      return canvas;
    }

    drawLine(startPoint, endPoint){
      // takes absolute x,y positions
      if(!this.ctx){
        this.ctx = this.canvas.getContext("2d");
      } 
      this.ctx.beginPath();
      this.ctx.moveTo(
        startPoint.x - this.offset.left,
        startPoint.y - this.offset.top
      );
      this.ctx.lineTo(
        endPoint.x - this.offset.left,
        endPoint.y - this.offset.top
      );
      this.ctx.stroke();
    }

}
