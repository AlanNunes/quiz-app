import { useEffect, useState } from "react";
import "./App.css";
import { QuizContext } from "./Context/QuizContext";
import { Player } from "./models/Player";
import ScoreBar from "./components/ScoreBar";
import TimerBar from "./components/TimerBar";
import QuestionContainer from "./components/QuestionContainer";
import { eventBus, AnswerEvent } from "./Bus/EventBus";
import { AnswerFeedback } from "./models/AnswerFeedback";

function App() {
  const [player, setPlayer] = useState<Player>(new Player("someone"));
  const [answerFeedback, setAnswerFeedback] = useState<AnswerFeedback>(
    new AnswerFeedback(false, false, "")
  );

  useEffect(() => {
    const greenBgColor = "#36c41d";
    const redBgColor = "#f25757";

    const clearAnswerFeedback = window.setTimeout(() => {
      document.body.style.backgroundColor = "transparent";
      document.body.style.transition = "background-color 1s linear";
    }, 1000);

    const onAnswerFeedback = (data: CustomEvent<AnswerEvent>) => {
      setAnswerFeedback(
        new AnswerFeedback(
          data.detail.isCorrect,
          true,
          data.detail.isCorrect ? "Você acertou!" : "Você errou :("
        )
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
        <div>
          <div className="answer-feedback">
            {answerFeedback.isVisible && answerFeedback.message}
          </div>
          <div className="top-bar">
            <div className="score-bar">
              <ScoreBar></ScoreBar>
            </div>
            <div className="timer-bar">
              <TimerBar></TimerBar>
            </div>
          </div>
          <div>
            <QuestionContainer></QuestionContainer>
          </div>
        </div>
      </QuizContext.Provider>
    </>
  );
}

export default App;
