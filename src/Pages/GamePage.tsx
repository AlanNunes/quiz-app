import { useEffect } from "react";
import { usePlayerContext } from "../Context/QuizContext";
import { Player } from "../models/Player";
import ScoreBar from "../components/ScoreBar";
import TimerBar from "../components/TimerBar";
import QuestionContainer from "../components/QuestionContainer";
import { eventBus, AnswerFeedbackEvent } from "../Bus/EventBus";

const GamePage = () => {
  const { player, setPlayer } = usePlayerContext();

  useEffect(() => {
    const greenBgColor = "#36c41d";
    const redBgColor = "#f25757";

    const clearAnswerFeedback = setTimeout(() => {
      document.body.style.backgroundColor = "transparent";
      document.body.style.transition = "background-color 0.5s linear";
    }, 1000);

    const onAnswerFeedback = (data: CustomEvent<AnswerFeedbackEvent>) => {
      document.body.style.backgroundColor = data.detail.isCorrect
        ? greenBgColor
        : redBgColor;

      clearAnswerFeedback;
    };
    eventBus.on("answer_feedback", onAnswerFeedback);

    return () => {
      eventBus.remove("answer_feedback", onAnswerFeedback);
      clearTimeout(clearAnswerFeedback);
    };
  }, [player]);

  return (
    <>
      <div className="quiz-container">
        <div className="finished-feedback">
          {player.finished &&
            (player.win
              ? `Parabéns ${player.name}! Você fez ${player.score} pontos :)`
              : `Poooxa ${player.name}, você fez apenas ${player.score} pontos :(`)}
          {player.finished && (
            <p>
              <button
                onClick={() =>
                  setPlayer((p) => {
                    return new Player(p.name);
                  })
                }
                className="restart"
              >
                Recomeçar
              </button>
            </p>
          )}
        </div>
        <div className="top-bar">
          <div className="score-bar">
            {!player.finished && <ScoreBar></ScoreBar>}
          </div>
          <div className="timer-bar">
            {!player.finished && <TimerBar></TimerBar>}
          </div>
        </div>
        <div>{!player.finished && <QuestionContainer></QuestionContainer>}</div>
      </div>
    </>
  );
};

export default GamePage;
