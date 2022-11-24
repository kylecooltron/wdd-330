// Game View handler

import {line_dist, angle_between_points} from "./functions.js";

const lineColor = "red";
const lineWidth = 1;

export default class Canvas {

    constructor(parentElement){
      this.parentElement = parentElement;
      this.canvas = null;
      this.offset = null;
      this.ctx = null;
      this.fade = null;
      this.lastSize = null;
      document.addEventListener("mouseup", () => {
        this.lastSize = null;
      })
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
      if(!this.fade){
        this.fade = setInterval(() => {
          this.fadeCanvas(0.1);
        }, 30);
      }
      return canvas;
    }

    fadeCanvas(opacity = 0.5){
      if(this.ctx){
        // constantly fade canvas to black
        this.ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // slow zoom effect
        let scalefactor = 0.01;
        this.ctx.drawImage(
          this.canvas,
          (this.canvas.width - this.canvas.width*(1+scalefactor))*0.5,
          (this.canvas.height - this.canvas.height*(1+scalefactor))*0.5,
          this.canvas.width*(1+scalefactor), 
          this.canvas.height*(1+scalefactor)
        );

      }
    }

    drawLine(startPoint, endPoint){
      // takes absolute x,y positions

      if(!this.ctx){ this.ctx = this.canvas.getContext("2d"); }
      this.ctx.strokeStyle = lineColor;

      let dist = Math.ceil(line_dist(startPoint.x, startPoint.y, endPoint.x, endPoint.y));
      let dynamicLineWidth = lineWidth + dist * 0.5;
      let ang = angle_between_points(startPoint.x,startPoint.y, endPoint.x, endPoint.y);

      for(let i=0; i<dist; i++){

        let point = {
          x: startPoint.x + Math.cos(ang) * i,
          y: startPoint.y + Math.sin(ang) * i,
        }

        let interpolatedSize = dynamicLineWidth;

        if(this.lastSize){
          interpolatedSize = this.lastSize + (dynamicLineWidth - this.lastSize) * (i / dist);
        }

        this.ctx.beginPath();
        this.ctx.arc(
          point.x - this.offset.left,
          point.y - this.offset.top,
          interpolatedSize,
          0,
          2 * Math.PI,
          false
          );
        this.ctx.fillStyle = lineColor;
        this.ctx.fill();
      }

      this.lastSize = dynamicLineWidth;

    }

}
