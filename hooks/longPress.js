import { useState, useEffect } from 'react';

export default function useLongPress(callback = ()=>{},
  clickCallback=()=>{}, onClickStart=()=>{}, ms = 300) {
  const [startLongPress, setStartLongPress] = useState(false);

  const [clickStart, setClickStart] = useState();

  useEffect(() => {
    let timerId;
    if (startLongPress) {
      onClickStart();
      timerId = setTimeout(() => {
        console.log('long press!');
        callback();
        setClickStart(Infinity);
      }, ms);
      setClickStart(Date.now());
    } else {
      if (Date.now() > clickStart) { console.log('click!'); clickCallback(); }
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [startLongPress]);

  return {
    onMouseDown: () => setStartLongPress(true),
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: () => setStartLongPress(true),
    onTouchEnd: () => setStartLongPress(false),
  };
}