
export default class Menu {

  constructor(gameController, menuID) {
    this.gameController = gameController;
    this.menuElement = document.getElementById(menuID);
    this.state = "start-menu";

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

  }

  updateGameController(){
    this.gameController.setState(this.state);
  }


}