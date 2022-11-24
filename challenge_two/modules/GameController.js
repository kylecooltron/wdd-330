
import Canvas from './Canvas.js';
import PlayerInput from './input.js';
import {Star, StarController} from './Star.js';
import Pattern from './Pattern.js';
import Menu from './Menu.js';

export default class GameController {

  constructor(parent) {
    this.parent = parent;
    this.parentElement = null;
    // controllers
    this.canvasController = null;
    this.patternCreator = null;
    this.starController = null;
    this.playerInput = null;
    this.menu = null;
    // game state
    this.game_state = "start-menu";
  }

  // accessors - - - - - - -

  // helpers - - - - - - - -

  initController(){
    // set parent
    this.parentElement = document.querySelector(this.parent);
    // init Canvas controller
    this.canvasController = new Canvas(this.parentElement);
    // init Pattern creator
    this.patternCreator = new Pattern(
      this.parentElement.offsetWidth,
      this.parentElement.offsetHeight
    )
    // init Star Controller
    this.starController = new StarController(this.parentElement);

    // init PlayerInput controller
    this.playerInput = new PlayerInput();

    this.menu = new Menu(this, "menu");

  }

  setState(state){
    this.game_state = state;
    if(this.game_state == "playing"){
      this.setGamePlaying();
    }
  }

  setGamePlaying(){

    // create test pattern
    this.starController.createStars(
      this.patternCreator.create_pattern()
    )
    
    // create canvas for gameplay and attach listeners
    this.playerInput.apply_listeners(
      [{
        element: this.canvasController.createCanvas(),
        type: "hold",
        callback: this.mouseHold,
        callparent: this,
      }]
    );

  }



  mouseHold(element, callparent){
    callparent.canvasController.drawLine(
      callparent.playerInput.previous_mouse_pos(),
      callparent.playerInput.mouse_pos()
    )
  }




}