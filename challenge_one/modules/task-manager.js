import Task from './task.js';

export default class TaskManager {
  constructor(gui, lsManager) {
    this.gui = gui;
    this.lsManager = lsManager;
    this.taskList = [];
    this.auto_increment_id = 0;
    this.filter = "all";
  }

  // accessors - - - - - - -

  // helpers - - - - - - - -

  getUniqueId(){
    // increment and return next id
    this.auto_increment_id += 1;
    return this.auto_increment_id;
  }

  // control - - - - - - - -

  createTasksFromList(list){
    list.forEach(task => {
      this.createTask(task.text, task.complete);
    });
  }

  createTaskFromGui(){
    // if the textbox is not blank
    if(this.gui.name().value != ""){
      // create a task
      this.createTask(this.gui.name().value);
      // reset the textbox
      this.gui.name().value = "";
    }
  }

  applyFilter(method){
    // default is "all"
    this.filter = method;
    // render the filtered list
    this.refresh();
  }

  getFilteredTasks(){
    let filtered_list = this.taskList;
    switch(this.filter) {
      case "active":
        filtered_list = this.taskList.filter(element => !element.getComplete())
        break;
      case "complete":
        filtered_list = this.taskList.filter(element => element.getComplete())
        break;
    }
    return filtered_list;
  }

  addInterfaceEventListeners(){
    // set event listeners for gui elements
    this.gui.create().addEventListener("click",() => {
      this.createTaskFromGui();
    });
    this.gui.byAll().addEventListener("click",() => {
      this.applyFilter("all");
    });
    this.gui.byActive().addEventListener("click",() => {
      this.applyFilter("active");
    });
    this.gui.byComplete().addEventListener("click",() => {
      this.applyFilter("complete");
    });
    this.gui.name().addEventListener('keydown',(event) => {
      if (event.key === "Enter") {
        this.createTaskFromGui();
      }
    });
    
  }

  createTask(name, complete = false){
    // if the textbox is not blank
    if(name != ""){
      // create a new task
      const task = new Task(this.getUniqueId(), this, name, complete);
      // add new task to task list
      this.taskList.push(task);
      // if user is only looking at complete tasks
      if(this.filter == "complete"){
        //change filter so they see new task
        this.applyFilter("all");
      }
      // render all tasks
      this.refresh();
    }
  }

  refresh(){
    // re-render all tasks
    this.renderTasks();
    // save list of tasks in local storage
    this.lsManager.saveTaskList(this.taskList);
  }

  removeTask(id){
    this.taskList = this.taskList.filter(task => (task.id != id))
    this.refresh();
  }


  // rendering - - - - - - -

  renderTasks(){
    // clear existing
    this.gui.list().innerHTML = "";
    // apply current filter
    const tasks = this.getFilteredTasks()
    // render all
    tasks.forEach(task => {
      this.renderTask(task);
    });

    if(tasks.length == 0){
      this.gui.list().innerHTML = `No ${this.filter != "all" ? this.filter : ""} tasks to show.`
    }

  }

  renderTask(task){
    this.gui.list().appendChild(task.render())
  }

}

