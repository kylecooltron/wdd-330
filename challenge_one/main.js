import StartApp from './modules/todo.js';

window.onload = (event) => {

  document.addEventListener('keydown',(event) => {
    // escape key to clear all local storage (for testing)
    if (event.key === "Escape") {
      localStorage.clear();
    }
  });

  StartApp();
}