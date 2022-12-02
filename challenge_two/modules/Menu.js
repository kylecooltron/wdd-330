
export default class Menu {

  constructor(gameController, menuID) {
    this.gameController = gameController;
    this.menuElement = document.getElementById(menuID);
    this.state = "start-menu";
    this.possible_states = [
      "start-menu",
      "playing",
      "game-over",
      "high-score"
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
        <div class="fixed-message">
          <h2>GAME OVER</h2>
        </div>`;
    }

    if(this.state == "high-score"){
      this.menuElement.innerHTML = `
        <div class="fixed-message" id="high-score">
          <h2>HIGH SCORE TABLE</h2>
          <table id="high-score-list">
          </table>
        </div>`;
    }

  }

  populateHighScoreList(scores){
    let table = this.menuElement.querySelector("#high-score-list");
    table.innerHTML = `<tr><th>Name</th><th>Score</th></tr>`;
    let new_highscore = false;
    scores.forEach(score => {
      if(score.name != ""){
        table.innerHTML += `
        <tr>
        <td>${score.name}</td>
        <td>${score.points}</td>
        </tr>`;
      }else{
        new_highscore = true;
        table.innerHTML += `
        <tr>
        <td><input id="player-name" type="text" placeholder="enter name" maxlength="15" value="" autofocus></td>
        <td>${score.points}</td>
        </tr>`;
      }
    });
    this.menuElement.querySelector("#high-score").innerHTML += `
    <div id="error-message"></div>
    <button id="submit-score">${new_highscore ?"Submit Score": "Exit"}</button>`;
    let submit_button = this.menuElement.querySelector("#submit-score");
    // add event listener for submit button
    submit_button.addEventListener('click', () => {
      if(new_highscore){
        let sanitizedInput = (this.menuElement.querySelector("#player-name").value).replace(/[^a-z0-9]+/gi, "");
        console.log("sanitized" + sanitizedInput);
        if(!this.gameController.submittedScore(
          sanitizedInput,
          scores
        )){
          // set to sanitized string
          this.menuElement.querySelector("#player-name").value = sanitizedInput;
          // display error message
          this.menuElement.querySelector("#error-message").innerHTML =`
          Enter valid name. Must be less than 15 characters.`;
        }
      }else{
        this.gameController.resetGame();
      }
    });
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