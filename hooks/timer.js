import { useState, useRef, useEffect } from 'react';

function useTimer(ms) {
  let [ expireAt, setExpireAt ] = useState();
  let intervalRef = useRef();
  let [ msLeft, setMsLeft ] = useState(ms);
  let [lastPaused, setLastPaused] = useState(ms);
  let [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;
    setMsLeft(ms);
    setLastPaused(ms);
  }, [ms])

  let start = () => { unpause(ms); }

  let unpause = (remainMs) => {
    let newExpire = Date.now() + remainMs;
    if (!intervalRef.current) {
      setIsPaused(false);
      setExpireAt(Date.now() + remainMs);
      setMsLeft(remainMs);
      intervalRef.current = setInterval(() => {
        setMsLeft(prevMsLeft => {
          if (prevMsLeft <= 0) {
            clearInterval(intervalRef.current);
            intervalRef.current = undefined;
            setLastPaused(undefined);
            setIsPaused(true);
            return prevMsLeft;
          } else {
            return Math.max(newExpire - Date.now(), 0);
          }
        });
      }, 50);
    }
  };

  let pause = () => {
    if (msLeft === 0) { return; }
    if (intervalRef.current) {
      setIsPaused(true);
      clearInterval(intervalRef.current);
      setLastPaused(msLeft);
      intervalRef.current = undefined;
    } else {
      console.log('unpausing:', msLeft);
      unpause(lastPaused);
    }
  }
  
  let reset = () => {
    setMsLeft(ms);
    setLastPaused(ms);
    setIsPaused(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }

  return {
    msLeft,
    start,
    pause,
    reset,
    isPaused,
  };
}

export default useTimer;