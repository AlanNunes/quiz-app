export class AnswerFeedback {
    isCorrect: boolean;
    isVisible: boolean;
    message: string;

    constructor(isCorrect: boolean, isVisible: boolean, message: string){
        this.isCorrect = isCorrect;
        this.isVisible = isVisible;
        this.message = message;
    }
}