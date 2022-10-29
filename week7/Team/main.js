import HikesController from './modules/hikeController.js';
//on load grab the array and insert it into the page

const myHikesController = new HikesController('hikes', 'comments');

window.addEventListener('load', () => {
  myHikesController.showHikeList();
});