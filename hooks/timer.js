import { useState, useRef, useEffect } from 'react';

function useTimer(ms) {
  let [ expireAt, setExpireAt ] = useState();
  let intervalRef = useRef();
  let [ msLeft, setMsLeft ] = useState(ms);
  let [lastPaused, setLastPaused] = useState(ms);

  useEffect(() => {
    setMsLeft(ms);
    setLastPaused(ms);
  }, [ms])

  let start = () => {
    let newExpire = Date.now() + ms;
    if (!intervalRef.current) {
      setExpireAt(Date.now() + ms);
      setMsLeft(ms);
      intervalRef.current = setInterval(() => {
        setMsLeft(prevMsLeft => {
          // console.log('expireAt:', newExpire);
          // console.log('prevMsLeft', prevMsLeft);
          if (prevMsLeft < 0) {
            clearInterval(intervalRef.current);
            intervalRef.current = undefined;
            setLastPaused(undefined);
            return prevMsLeft;
          } else {
            return Math.max(newExpire - Date.now(), 0);
          }
        });
      }, 50);
    }
  }

  let unpause = (remainMs) => {
    let newExpire = Date.now() + remainMs;
    if (!intervalRef.current) {
      setExpireAt(Date.now() + remainMs);
      setMsLeft(remainMs);
      intervalRef.current = setInterval(() => {
        setMsLeft(prevMsLeft => {
          // console.log('expireAt:', newExpire);
          // console.log('prevMsLeft', prevMsLeft);
          if (prevMsLeft < 0) {
            clearInterval(intervalRef.current);
            intervalRef.current = undefined;
            setLastPaused(undefined);
            return prevMsLeft;
          } else {
            return Math.max(newExpire - Date.now(), 0);
          }
        });
      }, 50);
    }
  };

  let pause = () => {
    if (intervalRef.current) {
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
  };
}

export default useTimer;