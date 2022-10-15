
export default class TaskInterface {
  constructor(
    listElement,
    taskCountElement,
    taskFilterByAllElement,
    taskFilterByActiveElement,
    taskFilterByCompletedElement,
    taskNameTextElement,
    taskCreateElement,
    ){
    this.listElement = listElement;
    this.taskCountElement = taskCountElement;
    this.taskFilterByAllElement = taskFilterByAllElement;
    this.taskFilterByActiveElement = taskFilterByActiveElement;
    this.taskFilterByCompletedElement = taskFilterByCompletedElement;
    this.taskNameTextElement = taskNameTextElement;
    this.taskCreateElement = taskCreateElement;
  }

  // accessors - - - - - - -
  list(){ return this.listElement; }
  count(){ return this.taskCountElement; }
  byAll(){ return this.taskFilterByAllElement; }
  byActive(){ return this.taskFilterByActiveElement; }
  byComplete(){ return this.taskFilterByCompletedElement; }
  name(){ return this.taskNameTextElement; }
  create(){ return this.taskCreateElement; }

}

