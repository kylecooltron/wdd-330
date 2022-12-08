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
        for(let idx = 1; idx < points_array.length; idx++){
          let size = 10-time;
          this.drawLine(points_array[idx-1], points_array[idx], color, size);
        }
      if(time > 0){
        setTimeout(() => {
          this.swipe_quality_effect(points_array, color, time - 1);
        }, 10);
      }
    }

    swipe_quality_word(word, color, swipe_points){
      if(this.offset){

        let potential_places = [
          {x: this.canvas.width*0.35, y: this.canvas.height*0.35},
          {x: this.canvas.width*0.65, y: this.canvas.height*0.35},
          {x: this.canvas.width*0.35, y: this.canvas.height*0.65},
          {x: this.canvas.width*0.65, y: this.canvas.height*0.65},
          {x: this.canvas.width*0.7, y: this.canvas.height*0.5},
          {x: this.canvas.width*0.3, y: this.canvas.height*0.5},
          {x: this.canvas.width*0.5, y: this.canvas.height*0.3},
          {x: this.canvas.width*0.5, y: this.canvas.height*0.7},
        ];
        let furthest_place = null;
        let furthest_distance = 0;
        potential_places.forEach(place => {
          // find the shorter distance between potential place and points
          let min_dist = null;

          if(swipe_points.length > 0){
            swipe_points.forEach(point => {
              let dist = line_dist(
                place.x,
                place.y,
                point.x - this.offset.left,
                point.y - this.offset.top,
                )
              if(min_dist == null || dist < min_dist){
                min_dist = dist;
              }
            });
          }
          

          if(min_dist && min_dist >= furthest_distance){
            // set to new furthest distance
            furthest_distance = min_dist;
            furthest_place = place;
          }
        });

        if(furthest_place){
          this.drawWord(word, color, furthest_place);
        }
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

    drawLine(startPoint, endPoint, line_color=lineColor, line_width=lineWidth){
      // takes absolute x,y positions

      if(!this.ctx){ this.ctx = this.canvas.getContext("2d"); }
      // this.ctx.strokeStyle = line_color;

      let dist = Math.ceil(line_dist(startPoint.x, startPoint.y, endPoint.x, endPoint.y));
      let dynamicLineWidth = line_width + dist * 0.3;
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
        this.ctx.fillStyle = line_color;
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

    drawWord(string, color, position){
      if(!this.ctx){ this.ctx = this.canvas.getContext("2d"); }
      this.ctx.fillStyle = color;

      this.ctx.save();
      this.ctx.translate(position.x ,position.y)
      this.ctx.rotate((Math.random()*50-25) * (Math.PI / 180));
      this.ctx.textAlign = "center";
      this.ctx.font = "bold 36px sans-serif";
      let lineheight = 50;
      let lines = string.split('\n');
      for (var i = 0; i<lines.length; i++){
        this.ctx.fillText(lines[i], 0, i*lineheight);
      }
      this.ctx.restore();


    }

}
