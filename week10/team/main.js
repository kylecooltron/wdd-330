import QuakesController from './modules/QuakesController.js';

window.onload = (event) => {
  let quakesController = new QuakesController(
    // parent element
    "#quakeList"
  );
  // initializes the controller
  quakesController.init();
}








