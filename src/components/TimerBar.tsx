import { useEffect, useState } from "react";
import { timerEventBus } from "../Bus/EventBus";
import { usePlayerContext } from "../Context/QuizContext";

const TimerBar = () => {
  const init_seconds = 60;
  const [seconds, setSeconds] = useState(init_seconds);
  const { player } = usePlayerContext();

  useEffect(() => {
    const timer = setInterval(() => {
      if (player.finished) {
        return;
      }
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 0) {
          clearInterval(timer);
          timerEventBus.dispatch("timer_isup", { isTimeUp: true });
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 100);

    return () => {
      setSeconds(init_seconds);
      clearInterval(timer);
    };
  }, [player]);
  return (
    <div className="progress">
      <div
        className="progress-bar w-75"
        role="progressbar"
        aria-valuenow={100}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {seconds} seconds
      </div>
    </div>
  );
};

export default TimerBar;
