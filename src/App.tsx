import { useState } from "react";
import "./App.css";
import { QuizContext } from "./Context/QuizContext";
import { Player } from "./models/Player";
import ScoreBar from "./components/ScoreBar";
import TimerBar from "./components/TimerBar";
import QuestionContainer from "./components/QuestionContainer";

function App() {
  const [player, setPlayer] = useState<Player>(new Player("someone"));

  return (
    <>
      <QuizContext.Provider value={{ player, setPlayer }}>
        <div>
          <div className="top-bar">
            <div className="answer-feedback">

            </div>
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
