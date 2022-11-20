  // Game View handler

  export default class Canvas {

    constructor(parentElement){
      this.parentElement = parentElement;
      this.canvas = null;
    }

    createCanvas(){
      if(this.canvas != null){
        this.canvas.remove();
      }
      const width = this.parentElement.offsetWidth;
      const height = this.parentElement.offsetHeight;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      this.parentElement.append(canvas);
      this.canvas = canvas;
      return canvas;
    }

    drawLine(startPoint, endPoint){
      const ctx = this.canvas.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.stroke();
    }

}
