import { useState, useRef, useEffect } from 'react';

function useTimer() {
  let [ expireAt, setExpireAt ] = useState(Date.now() + 5000);
  let intervalRef = useRef();
  let [ msLeft, setMsLeft ] = useState(5000);


  let start = (newExpire) => {
    if (!intervalRef.current) {
      setExpireAt(Date.now() + 5000);
      setMsLeft(5000);
      intervalRef.current = setInterval(() => {
        setMsLeft(prevMsLeft => {
          // console.log('expireAt:', newExpire);
          // console.log('prevMsLeft', prevMsLeft);
          if (prevMsLeft < 0) {
            clearInterval(intervalRef.current);
            intervalRef.current = undefined;
            return prevMsLeft;
          } else {
            return newExpire - Date.now();
          }
        });
      }, 50);
    }
  }

  let pause = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    } else {
      console.log('unpausing:', msLeft);
      start(Date.now() + msLeft);
    }
  }
  
  let reset = () => {
    setMsLeft(5000);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }

  return {
    msLeft,
    start: start,
    pause,
    reset,
  };
}

export default useTimer;