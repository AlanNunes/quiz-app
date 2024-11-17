import { useEffect, useState } from "react";
import "./App.css";
import { QuizContext } from "./Context/QuizContext";
import { Player } from "./models/Player";
import ScoreBar from "./components/ScoreBar";
import TimerBar from "./components/TimerBar";
import QuestionContainer from "./components/QuestionContainer";
import { eventBus, AnswerFeedbackEvent } from "./Bus/EventBus";
import { AnswerFeedback } from "./models/AnswerFeedback";

function App() {
  const [player, setPlayer] = useState<Player>(new Player("someone"));
  const [answerFeedback, setAnswerFeedback] = useState<AnswerFeedback>(
    new AnswerFeedback(false, false, "")
  );

  useEffect(() => {
    const greenBgColor = "#36c41d";
    const redBgColor = "#f25757";

    const clearAnswerFeedback = setTimeout(() => {
      document.body.style.backgroundColor = "transparent";
      document.body.style.transition = "background-color 1s linear";
      setAnswerFeedback(new AnswerFeedback(false, false, ""));
    }, 1300);

    const onAnswerFeedback = (data: CustomEvent<AnswerFeedbackEvent>) => {
      setAnswerFeedback(
        new AnswerFeedback(data.detail.isCorrect, true, data.detail.message)
      );
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
      <QuizContext.Provider value={{ player, setPlayer }}>
        <div className="quiz-container">
          <div className="answer-feedback">
            {answerFeedback.isVisible && answerFeedback.message}
          </div>
          <div className="finished-feedback">
            {player.finished &&
              (player.win
                ? `Parabéns! Você fez ${player.score} pontos :)`
                : `Poooxa, você fez apenas ${player.score} pontos :(`)}
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
          <div>
            {!player.finished && <QuestionContainer></QuestionContainer>}
          </div>
        </div>
      </QuizContext.Provider>
    </>
  );
}

export default App;
