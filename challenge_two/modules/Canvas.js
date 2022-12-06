// Game View handler

import {line_dist, angle_between_points} from "./functions.js";

const lineColor = "aqua";
const lineWidth = 1;
const sparkColor = (seed = 0) => {
  return seed % 2 == 0 ? "yellow" : "white"; 
};

export default class Canvas {

    constructor(parentElement, gameController){
      this.parentElement = parentElement;
      this.gameController = gameController;
      this.canvas = null;
      this.offset = null;
      this.ctx = null;
      this.fade = null;
      this.lastSize = null;
      document.addEventListener("mouseup", () => {
        this.lastSize = null;
      })
      // spark effects
      this.spark_flow_rate = 0;
      setInterval(() => {
        this.spark_flow();
      }, 20);
    }

    swipe_quality_effect(points_array, color, time){
        for(let idx = 0; idx < points_array.length; idx++){
          if(this.offset){
            let point = {
              x: points_array[idx].x - this.offset.left,
              y: points_array[idx].y - this.offset.top,
            }
            this.drawSpark(
              point,
              10,
              idx * Math.round((idx+1) * 0.33) * idx,
              30,
              color,
            );
          }
        }
      if(time > 0){
        setTimeout(() => {
          this.swipe_quality_effect(points_array, color, time - 1);
        }, 10);
      }
    }

    spark_flow(){
      if(this.canvas){
      // used for spark moving effect
      this.spark_flow_rate += 0.1;
      // make stars emit sparks
      let starDict = this.gameController.getStarDict();
      let seed = 0;
      for(let key in starDict){
        let star = starDict[key];
        seed += 1;
        if(star.state == "spinning"){
          let size_factor = window.getComputedStyle(star.container_div).getPropertyValue("opacity");
          this.drawSpark(star.get_position(), 
          30 * size_factor,
           seed,
           Math.round(5 * size_factor)+1);
        }
        if(star.state == "exploding"){
          let size_factor = window.getComputedStyle(star.element).getPropertyValue("opacity");
          this.drawSpark(star.get_position(), 
          100 * (1-size_factor),
           seed, 5);
        }
      }
      // create random sparkles
      this.drawRandomSparkle();
      }
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
      let dynamicLineWidth = lineWidth + dist * 0.3;
      let ang = angle_between_points(startPoint.x,startPoint.y, endPoint.x, endPoint.y);

      let line_points = [];

      for(let i=0; i<dist; i++){

        let point = {
          x: startPoint.x + Math.cos(ang) * i,
          y: startPoint.y + Math.sin(ang) * i,
        }

        line_points.push(point);

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

      return line_points;

    }


    drawSpark(startPoint, size, seed, spark_count = 5, color=null){

      if(!this.ctx){ this.ctx = this.canvas.getContext("2d"); }
      
      let sparkCount = spark_count;

      for(let i=1; i < sparkCount+1; i++){
        let ang = ((i+seed*0.1) * (360/sparkCount)) + Math.cos(seed + this.spark_flow_rate*0.1);
        let add_size = (Math.sin(this.spark_flow_rate + i*0.5) * (ang*0.1 % size)) * (size*0.02);
        let pointFrom = {
          x: startPoint.x + Math.cos(ang) * add_size,
          y: startPoint.y + Math.sin(ang) * add_size,
        }
        let pointTo = {
          x: startPoint.x + Math.cos(ang) * (add_size + 1 + Math.abs(1*Math.cos(seed + i))),
          y: startPoint.y + Math.sin(ang) * (add_size + 1 + Math.abs(1*Math.cos(seed+ i))),
        }

        if(color){
          this.ctx.strokeStyle = color;
        }else{
          this.ctx.strokeStyle = sparkColor(i);
        }

        this.ctx.beginPath();
        this.ctx.moveTo(
          pointFrom.x ,
          pointFrom.y ,
        );
        this.ctx.lineTo(
          pointTo.x ,
          pointTo.y ,
        );
        this.ctx.stroke();
      }

    }

    drawRandomSparkle(){
      if(!this.ctx){ this.ctx = this.canvas.getContext("2d"); }
      this.ctx.fillStyle = [
        "white","yellow","aqua","lime","blue"
      ][Math.floor(Math.random() * 6)];
      this.ctx.fillRect(
        Math.random()*this.canvas.width,
        Math.random()*this.canvas.height,
        1+(Math.random()*3), 1+(Math.random()*3)
      );
    }

}
