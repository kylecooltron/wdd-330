
export default class Score {

  constructor(parentElement) {
    this.parentElement = parentElement
    this.score = 0;
  }

  get_score(){
    return this.score;
  }

  add_score(points){
    this.score += points;
    this.render();
  }

  set_score(score){
    this.score = score;
    this.render();
  }

  render(){
    this.parentElement.innerHTML = `SCORE: ${this.score}`;
  }

}