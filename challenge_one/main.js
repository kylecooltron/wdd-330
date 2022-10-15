import TaskInterface from './modules/task-interface.js';
import TaskManager from './modules/task-manager.js';




window.onload = (event) => {

  const taskInterface = new TaskInterface(
    document.getElementById("task-list"),
    document.getElementById("task-count"),
    document.getElementById("filter-by-all"),
    document.getElementById("filter-by-active"),
    document.getElementById("filter-by-completed"),
    document.getElementById("task-name"),
    document.getElementById("add-task-btn"),
  );

  // create task manager
  const taskManager = new TaskManager(taskInterface);
  // start task manager
  taskManager.addInterfaceEventListeners();

}