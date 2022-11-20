
// import needed modules for todo app
/*
 import PlayerInput from './input.js';
*/
import GameController from './GameController.js';

// start the Game app
export default function StartGame(){

  const gameController = new GameController("#game");
  gameController.initController();

  /*
  // define 
  const playerInput = new PlayerInput();

  // call setup functions
  playerInput.listenForSwipes();


  */
}

