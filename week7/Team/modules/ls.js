// local storage for tasks

export default class LocalStorageManager {

  // { id : timestamp, content: string, completed: bool }

  constructor(ls_type = "hikes"){
    this.ls_type = ls_type; 
  }

  // accessors - - - - - - -

  // control - - - - - - - -
  loadData(){
    const result = JSON.parse(localStorage.getItem(this.ls_type));
    return result
  }

  saveData(data){
    // initialize data list
    localStorage.setItem(this.ls_type, JSON.stringify(data));
  }

}
