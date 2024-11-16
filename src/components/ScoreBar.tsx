import { usePlayerContext } from "../Context/QuizContext";

const ScoreBar = () => {
  const { player } = usePlayerContext();
  return (
    <>
      <div>
        <label>Score: </label>
        <span>{player.score}</span>
      </div>
    </>
  );
};

export default ScoreBar;
