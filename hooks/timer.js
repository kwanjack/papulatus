import { useState, useRef, useEffect } from 'react';

function useTimer(ms, onTimeLimitReached, onReset) {
  let [ expireAt, setExpireAt ] = useState();
  let intervalRef = useRef();
  let [lastPaused, setLastPaused] = useState(ms);
  let [isPaused, setIsPaused] = useState(true);
  let [ timeData, setTimeData ] = useState({ picked: ms, left: ms });

  useEffect(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;
    setTimeData({ picked: ms, left: ms})
    setLastPaused(ms);
  }, [ms])

  let start = () => { unpause(ms); }

  let unpause = (remainMs) => {
    let newExpire = Date.now() + remainMs;
    if (!intervalRef.current) {
      setIsPaused(false);
      setExpireAt(Date.now() + remainMs);
      setTimeData({ picked: ms, left: remainMs });

      intervalRef.current = setInterval(() => {
        setTimeData(prevTimeData => {
          if (prevTimeData.left <= 0) {
            clearInterval(intervalRef.current);
            intervalRef.current = undefined;
            setLastPaused(undefined);
            setIsPaused(true);
            onTimeLimitReached();
            return prevTimeData;
          } else {
            return { ...prevTimeData, left: Math.max(newExpire - Date.now(), 0) };
          }
        });
      }, 50);
    }
  };

  let pause = () => {
    if (timeData.left === 0) { return; }
    if (intervalRef.current) {
      setIsPaused(true);
      clearInterval(intervalRef.current);
      setLastPaused(timeData.left);
      intervalRef.current = undefined;
    } else {
      unpause(lastPaused);
    }
  }
  
  let reset = () => {
    setTimeData({ picked: ms, left: ms });
    setLastPaused(ms);
    setIsPaused(true);
    onReset();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }

  return {
    pickedTime: timeData.picked,
    msLeft: timeData.left,
    start,
    pause,
    reset,
    isPaused,
  };
}

export default useTimer;