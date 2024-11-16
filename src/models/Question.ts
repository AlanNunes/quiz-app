export class Question{
    id: number;
    text: string;
    answers: Answer[];

    constructor(id: number, text: string, answers: Answer[]) {
        this.id = id;
        this.text = text;
        this.answers = answers;
    }
}

export class Answer {
    id: number;
    text: string;
    isCorrect: boolean = false;

    constructor(id: number, text: string, isCorrect: boolean = false){
        this.id = id;
        this.text = text;
        this.isCorrect = isCorrect;
    }
}