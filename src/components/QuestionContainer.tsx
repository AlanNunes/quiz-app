import { useEffect, useState } from "react";
import { QuizService } from "../services/QuizService";
import { Question } from "../models/Question";
import { usePlayerContext } from "../Context/QuizContext";
import { Player } from "../models/Player";
import { eventBus, timerEventBus, TimerEvent } from "../Bus/EventBus";

const QuestionContainer = () => {
  const { player, setPlayer } = usePlayerContext();
  const [seen_questions, setSeen_questions] = useState<number[]>([]);
  const [question, setQuestion] = useState<Question>();
  const [selected_answer, setSelected_answer] = useState<number>();

  useEffect(() => {
    let question = QuizService.GetNextQuestion(seen_questions);
    if (question === undefined) {
      player.Finish();
      if (player.score >= 700) {
        player.Win();
      } else {
        player.Loose();
      }
      setPlayer(
        new Player(player.name, player.score, player.finished, player.win)
      );
    }
    setSelected_answer(undefined);
    setQuestion(question);
    setSeen_questions((questions) => [...questions, question?.id]);

    const onTimeIsUp = (_: CustomEvent<TimerEvent>) => {
      ConfirmAnswer();
    };
    timerEventBus.on("timer_isup", onTimeIsUp);

    return () => {
      timerEventBus.remove("timer_isup", onTimeIsUp);
    };
  }, [player]);

  const SetSelectedAnswer = (answer_id: number) => {
    setSelected_answer(answer_id);
  };

  const ConfirmAnswer = () => {
    const score = QuizService.ConfirmAnswer(question!, selected_answer);
    const isCorrect = score > 0;
    eventBus.dispatch("answer_feedback", {
      isCorrect: isCorrect,
    });
    setPlayer((player) => {
      let new_player = new Player(player.name);
      new_player.AddToScore(player.score + score);
      return new_player;
    });
  };

  return (
    <>
      <div className="question">
        <label>{question?.text}</label>
      </div>
      <div className="answers">
        {question?.answers.map((answer) => {
          return (
            <div
              key={answer.id}
              onClick={() => SetSelectedAnswer(answer.id)}
              className={
                selected_answer === answer.id ? "answer-selected" : "answer"
              }
            >
              {answer.text}
            </div>
          );
        })}
      </div>
      <div>
        <button
          onClick={ConfirmAnswer}
          className="confirm"
          disabled={selected_answer === undefined}
        >
          Confirmar
        </button>
      </div>
    </>
  );
};

export default QuestionContainer;
