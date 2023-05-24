import './StopWatch.less';
import React, { useEffect } from 'react';
import { createPoseLandmarker } from '@/views/DetectPuspup/DetectPose';
const formatTime = (timer) => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};
const useTimer = (initialState = 0) => {
  const [timer, setTimer] = React.useState(initialState);
  const [isActive, setIsActive] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const countRef = React.useRef(null);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(false);
  };

  const handleResume = () => {
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };

  return { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset };
};
export default function Timer({
  title,
  reps,
  repsGoal,
  startPreDict,
  resetPredict,
  onFinishWorkout,
}: {
  title: string;
  startPreDict: Function;
  reps: number;
  repsGoal: number;
  resetPredict: Function;
  onFinishWorkout: Function;
}) {
  const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } =
    useTimer(0);

  useEffect(() => {
    if (reps === repsGoal) {
      handleReset();
      onFinishWorkout({ times: timer });
    }
    return () => {};
  }, [reps]);

  return (
    <div className="timer-container">
      <h3>{title}</h3>
      <div className="stopwatch-card">
        <p>{formatTime(timer)}</p>
        <p>
          Reps: {reps}/{repsGoal}
        </p>
        <div className="buttons">
          {/*{!isActive && !isPaused ? (*/}
          {/*  <button onClick={handleStart}>Start</button>*/}
          {/*) : isPaused ? (*/}
          {/*  <button onClick={handlePause}>Pause</button>*/}
          {/*) : (*/}
          {/*  <button onClick={handleResume}>Resume</button>*/}
          {/*)}*/}

          {!isActive && (
            <button
              onClick={async () => {
                startPreDict().then(() => handleStart());
                //setTimeout(handleStart, 2000);
              }}
            >
              Start
            </button>
          )}
          <button
            onClick={() => {
              resetPredict();
              handleReset();
            }}
            hidden={!isActive}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
