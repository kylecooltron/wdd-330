
export default class Menu {

  constructor(gameController, menuID) {
    this.gameController = gameController;
    this.menuElement = document.getElementById(menuID);
    this.state = "start-menu";
    this.possible_states = [
      "start-menu",
      "playing",
      "game-over",
    ]
    this.render();
  }

  setState(state){
    if(this.possible_states.includes(state)){
      this.state = state;
    }else{
      console.log("State not implemented.");
    }
    this.render();
  }

  render(){
    if(this.state == "start-menu"){
      this.menuElement.innerHTML = `
        <div class="fixed-message" id="start-btn">
          <h2>READY?</h2>
          <a>Click to start</a>
        </div>`;
      document.querySelector("#start-btn").addEventListener("click", () => {
        //start game
        this.state = "playing";
        this.updateGameController();
        this.render();
      });
    }

    if(this.state == "playing"){
      this.menuElement.innerHTML = ``;
    }

    if(this.state == "game-over"){
      this.menuElement.innerHTML = `
        <div class="fixed-message" id="start-btn">
          <h2>GAMER OVER</h2>
        </div>`;
      document.querySelector("#start-btn").addEventListener("click", () => {
        //start game
        this.state = "playing";
        this.updateGameController();
        this.render();
      });
    }

  }

  addStrike(){
    if(this.state == "playing"){
      // create fixed upper left div
      if(this.menuElement.innerHTML == ``){
        this.menuElement.innerHTML = `
          <div class="fixed-upper-left" id="strikes"></div>`;
          let canvas = document.querySelector("canvas");
          if(canvas){
            let rect = canvas.getBoundingClientRect();
            let element = this.menuElement.querySelector("#strikes")
            element.style.left = rect.left;
            element.style.top = rect.top;
          }
          
      }
      // Add X
      this.menuElement.querySelector("#strikes").innerHTML += "╳";
    }
  }

  updateGameController(){
    this.gameController.setState(this.state);
  }


}