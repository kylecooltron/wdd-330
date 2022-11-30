
import Canvas from './Canvas.js';
import PlayerInput from './input.js';
import {Star, StarController} from './Star.js';
import Pattern from './Pattern.js';
import Menu from './Menu.js';
import Score from './Score.js';
import { line_dist, point_dist } from './functions.js';

export default class GameController {

  constructor(parent, scoreElement) {
    this.parent = parent;
    this.parentElement = null;
    this.score = new Score(document.querySelector(scoreElement));
    // controllers
    this.canvasController = null;
    this.patternCreator = null;
    this.starController = null;
    this.playerInput = null;
    this.menu = null;
    // game state
    this.game_state = "start-menu";
    // game variables
    this.extra_length_allowed = 0;
    this.current_swipe_dist = 0;
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
    this.starController = new StarController(this, this.parentElement);

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
    // create canvas for gameplay and attach listeners
    this.playerInput.apply_listeners(
      [{
        element: this.canvasController.createCanvas(),
        type: "hold",
        callback: this.mouseHold,
        callend: this.mouseUp,
        callparent: this,
      }]
    );
    // create first pattern
    this.starController.createStars(
      this.patternCreator.create_pattern()
    )
    // reset score
    this.score.set_score(0);
  }

  lastStarFaded(){
    // reset swipe input
    this.playerInput.nextStarPattern();
    // create test pattern
    this.starController.createStars(
      this.patternCreator.create_pattern()
    )
  }



  mouseHold(element, callparent){
    // draw line on canvas
    let line_points = callparent.canvasController.drawLine(
      callparent.playerInput.previous_mouse_pos(),
      callparent.playerInput.mouse_pos()
    )
    // check for collisions
    callparent.starController.mouseCheck(
      line_points,
    )
    // update the swipe dist
    callparent.current_swipe_dist += point_dist(
      callparent.playerInput.previous_mouse_pos(),
      callparent.playerInput.mouse_pos()
    );
    // check if swipe exceeds max length
    if(callparent.current_swipe_dist > callparent.patternCreator.get_pattern_total_length() + callparent.extra_length_allowed){
      // reset swipe input
      callparent.playerInput.nextStarPattern();
      // let the star controller know the swipe ended early
      callparent.starController.swipeEnded();
    }
  }

  mouseUp(callparent){
    // let the star controller know the swipe ended early
    callparent.starController.swipeEnded();
    // reset the swipe dist
    callparent.current_swipe_dist = 0;
  }

  addPoints(points){
    this.score.add_score(points);
  }



}