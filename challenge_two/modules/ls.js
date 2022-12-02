// local storage for game

export default class LocalStorageManager {

  constructor(ls_type = "high-scores"){
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

  clearData(){
    // initialize data list
    localStorage.setItem(this.ls_type, null);
  }

}