import { useEffect, useState } from "react";

const TimerBar = () => {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 0) {
          return 0;
        }
        return prevSeconds - 1;
      });

      if (seconds <= 0) {
        alert("Time is up!");
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);
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
