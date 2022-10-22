
// import needed modules for todo app
import TaskInterface from './task-interface.js';
import TaskManager from './task-manager.js';
import LocalStorageManager from './ls.js';


// start the ToDo app
export default function StartApp(){

  // define interface elements the task will use
  const taskInterface = new TaskInterface(
    document.getElementById("task-list"),
    document.getElementById("task-count"),
    document.getElementById("filter-by-all"),
    document.getElementById("filter-by-active"),
    document.getElementById("filter-by-completed"),
    document.getElementById("task-name"),
    document.getElementById("add-task-btn"),
  );

  // create ls manager
  const lsManager = new LocalStorageManager();

  // get list of previously made tasks from ls
  lsManager.loadTasks();

  // create task manager
  const taskManager = new TaskManager(taskInterface, lsManager);
  
  // create tasks from ls list
  taskManager.createTasksFromList(lsManager.getTaskList());

  // start task manager
  taskManager.addInterfaceEventListeners();

}

