
// import classes
import Canvas from './Canvas.js';
import PlayerInput from './input.js';
import {Star, StarController} from './Star.js';
import Pattern from './Pattern.js';
import Menu from './Menu.js';
import Score from './Score.js';
import LocalStorageManager from './ls.js';
// import functions
import { point_dist } from './functions.js';

export default class GameController {

  constructor(parent, scoreElement){
    this.parent = parent;
    this.parentElement = null;
    this.score = new Score(document.querySelector(scoreElement));
    this.lsManager = new LocalStorageManager();
    // For testing purposes
    this.lsManager.clearData();
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
    this.strikes = 0;
    // game difficulty control
    this.patterns_count = 0;
    this.difficulty_counter = 0;
    this.difficulty_inc_wait = 1000;
    this.default_fadespeed = 5000;
    this.fadespeed = this.default_fadespeed;
    this.startDifficultyIncrement();
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
    this.playerInput = new PlayerInput(this);

    this.menu = new Menu(this, "menu");

  }

  windowResize(){
    // reset
    this.strikes = 0;
    // reset difficulty
    this.patternCreator.reset_complexity();
    this.fadespeed = this.default_fadespeed;
    this.resetGame();
    this.starController.instantlyRemoveStars();
    // reset the swipe dist
    this.current_swipe_dist = 0;
    // reset canvas listeners
    this.playerInput.reset_listeners();
    // recreate canvas
    this.playerInput.apply_listeners(
      [{
        element: this.canvasController.createCanvas(),
        type: "hold",
        callback: this.mouseHold,
        callend: this.mouseUp,
        callparent: this,
      }]
    );
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
      this.patternCreator.create_pattern(),
      this.fadespeed,
    )
    // reset score
    this.score.set_score(0);
  }

  lastStarFaded(missedStars, faded){
    // handle missed stars
    if(faded){
      this.handleMissedStars(
        {
          "missed": missedStars,
          "out_of": this.starController.getStarStartCount(),
        }
      )
    }
    // reset swipe input
    this.playerInput.nextStarPattern();

    if(this.game_state == "playing"){
      // create new pattern
      this.starController.createStars(
        this.patternCreator.create_pattern()
      )
      // increment counter (for difficulty)
      this.patterns_count += 1;
    }

  }

  handleMissedStars(info){
    // determine quality of swipe
    if(info.missed > info.out_of * 0.5){
      this.menu.addStrike();
      this.strikes += 1;
    }
    // handle game over
    if(this.strikes >= 3){
      this.handleGameOver();
    }
  }

  handleGameOver(){
    this.menu.setState("game-over");
    this.game_state = "game-over";
    // reset
    this.strikes = 0;
    // reset difficulty
    this.patternCreator.reset_complexity();
    this.fadespeed = this.default_fadespeed;
    // set timer
    setTimeout(() => {
      this.displayHighScoreTable();
    }, 2000);
  }

  submittedScore(player_name, scores){
    if(player_name==""){
      return false;
    }
    // replace blank score with submitted name
    scores = scores.map(score => {
      if(score.name == ""){
        return {"name": player_name, "points": score.points};
      }else{
        return score;
      }
    })
    this.lsManager.saveData(scores);
    this.resetGame();
    // let calling function know it was succesful
    return true;
  }

  resetGame(){
    this.score.set_score(0);
    this.patterns_count = 0;
    this.menu.setState("start-menu");
    this.game_state = "start-menu";
  }

  increaseDifficulty(){

    //increase pattern complexity
    this.patternCreator.set_complexity({
      "count": (
        this.patternCreator.get_complexity_attr("count") + (
          // increase count every 8 patterns
          this.difficulty_counter % 8 == 0 ? 1 : 0
        )
        ),
      "angle": Math.min(320, // max angle
        this.patternCreator.get_complexity_attr("angle") + (
          // increase angle every 4 patterns
          this.difficulty_counter % 4 == 0 ? 1 : 0
        )
      ),
      "dist": Math.max(30,
        this.patternCreator.get_complexity_attr("dist") - (
          // decrease angle every 8 patterns
          this.difficulty_counter % 8 == 0 ? 1 : 0
        )
      ),
    });

    // increase the speed at which stars fade
    this.fadespeed = Math.max(100, this.fadespeed - 5 );

  }

  difficulty_increment(){
    if(this.game_state == "playing"){
      this.difficulty_counter += 1;
      this.increaseDifficulty();
    }
    setTimeout(() => {
      this.difficulty_increment();
    }, this.difficulty_inc_wait);
  }

  startDifficultyIncrement(){
    // number increases every t steps
    setTimeout(() => {
      this.difficulty_increment();
    }, this.difficulty_inc_wait);
  }

  displayHighScoreTable(){
    this.menu.setState("high-score");
    let high_scores = this.lsManager.loadData();
    // if no high score data was loaded
    if(!high_scores){
      // create empty array
      high_scores = [];
    }
    high_scores.push({
      "name": "",
      "points": this.score.get_score(),
    });

    high_scores.sort((a, b) => (a.points > b.points) ? -1 : 1);
    // only show top five scores
    high_scores = high_scores.slice(0, 5);
    this.menu.populateHighScoreList(high_scores);
    this.game_state = "high-score";
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
      // let the star controller know the swipe ended early
      callparent.starController.swipeEnded();
      // reset swipe input
      callparent.playerInput.nextStarPattern();
    }
  }

  mouseUp(callparent, checkMissed=true){
    // let the star controller know the swipe ended early
    callparent.starController.swipeEnded(checkMissed);
    // reset the swipe dist
    callparent.current_swipe_dist = 0;
  }

  addPoints(points){
    this.score.add_score(points);
  }



}