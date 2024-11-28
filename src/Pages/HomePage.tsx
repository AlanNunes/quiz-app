import { usePlayerContext } from "../Context/QuizContext";
import { Player } from "../models/Player";
import { Form } from "react-router-dom";

const HomePage = () => {
  const { setPlayer } = usePlayerContext();

  return (
    <Form action="game">
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
          onChange={(e) => {
            setPlayer(new Player(e.currentTarget.value));
          }}
        ></input>
      </div>
      <div>
        <button className="start-game">
          Começar
        </button>
      </div>
    </Form>
  );
};

export default HomePage;
