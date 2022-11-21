
import Canvas from './Canvas.js';
import PlayerInput from './input.js';
import Star from './Star.js';
import Pattern from './Pattern.js';


export default class GameController {

  constructor(parent) {
    this.parent = parent;
    this.parentElement = null;
    // controllers
    this.canvasController = null;
    this.patternCreator = null;
    this.playerInput = null;

    // game state
    this.game_state = "loading";
  }

  // accessors - - - - - - -

  // helpers - - - - - - - -

  initController(){
    // set parent
    this.parentElement = document.querySelector(this.parent);
    // init Canvas controller
    this.canvasController = new Canvas(this.parentElement);
    const canvas = this.canvasController.createCanvas();
    // init Pattern creator
    this.patternCreator = new Pattern(
      this.parentElement.offsetWidth,
      this.parentElement.offsetHeight
    )
    // init PlayerInput controller
    this.playerInput = new PlayerInput(
      [{
        element: canvas,
        type: "hold",
        callback: this.mouseHold,
        callparent: this,
      }]
    );
  }

  mouseHold(element, callparent){
    callparent.canvasController.drawLine(
      callparent.playerInput.mouse_pos(),
      {
        x: callparent.playerInput.mouse_x() - 10,
        y: callparent.playerInput.mouse_y() - 10
      }
    )
  }




}