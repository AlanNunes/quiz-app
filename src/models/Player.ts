export class Player {
  id: number = Math.floor(Math.random() * (1000 - 1)) + 1;
  name: string;
  score: number = 0;
  finished: boolean = false;
  win: boolean | undefined = undefined;

  constructor(name: string, score: number = 0, finished: boolean = false, win: boolean | undefined = undefined) {
    this.name = name;
    this.score = score;
    this.finished = finished;
    this.win = win;
  }

  Reset(){
    this.score = 0;
    this.win = false;
    this.finished = false
  }

  AddToScore(value: number) {
    this.score += value;
  }

  Finish() {
    this.finished = true;
  }

  Loose() {
    this.win = false;
  }

  Win() {
    this.win = true;
  }
}
