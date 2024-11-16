export class Player {
  id: number = Math.floor(Math.random() * (1000 - 1)) + 1;
  name: string;
  score: number = 0;

  constructor(name: string) {
    this.name = name;
  }

  AddToScore(value: number) {
    this.score += value;
  }
}
