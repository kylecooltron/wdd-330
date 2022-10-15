
export default class Task {
  constructor(id, manager, text, complete=false) {
    this.id = id;
    this.manager = manager;
    this.text = text;
    this.complete = complete;
  }

  // accessors - - - - - - -
  setText(text){
    this.text = text;
  }
  setComplete(complete){
    this.complete = complete;
    this.manager.refresh();
  }
  getComplete(){
    return this.complete;
  }
  
  // control - - - - - - - -

  destroy(){
    this.manager.removeTask(this.id);
  }

  setTaskButtonEventListeners(element){
    element.querySelector(".task-complete-btn").addEventListener("click",() => {
      this.setComplete(!this.complete); // toggle complete
    });
    element.querySelector(".task-remove-btn").addEventListener("click",() => {
      this.destroy();
    });
  }

  // rendering - - - - - - -
  render(){
    const element = document.createElement("li");
    element.setAttribute("data-task-id", this.id);
    element.setAttribute("data-task-complete", this.complete);
    element.classList.add("task-li");
    element.innerHTML = `
    <button class="task-complete-btn ${this.complete ? 'complete' : ''}">
      ${this.complete ? "✓" : "Mark <br> Complete"}
    </button>
    <h2>${this.text}</h2>
    <button class="task-remove-btn">✕</button>`;
    // set up listeners for task buttons
    this.setTaskButtonEventListeners(element);
    // return element to be appended by manager
    return element;
  }

}

