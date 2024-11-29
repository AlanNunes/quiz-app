import { usePlayerContext } from "../Context/QuizContext";
import { Player } from "../models/Player";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { setPlayer } = usePlayerContext();
  const navigate = useNavigate();

  return (
    <>
      <h1>Tech Quiz</h1>
      <div>
        <label htmlFor="playerName" className="playerNameLabel">
          Preencha seu nome:
        </label>
      </div>
      <div>
        <input
          type="text"
          name="playerName"
          className="player-name"
          autoComplete="off"
          onChange={(e) => {
            setPlayer(new Player(e.currentTarget.value));
          }}
        ></input>
      </div>
      <div>
        <button className="start-game" onClick={() => navigate("game")}>
          Começar
        </button>
      </div>
    </>
  );
};

export default HomePage;
