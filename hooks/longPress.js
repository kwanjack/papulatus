import { useState, useEffect, useRef } from 'react';

export default function useLongPress({
    onLongPress,
    onShortPress,
    onClickStart,
    onLongPressCancel,
    onLongPressGuaranteed
  }, resetTime, longPressGuaranteedTime) {
  const [startLongPress, setStartLongPress] = useState(false);

  const [clickStart, setClickStart] = useState();

  const longPressStartId = useRef();

  useEffect(() => {
    let timerId;

    if (startLongPress) {
      onClickStart();
      longPressStartId.current = setTimeout(onLongPressGuaranteed, longPressGuaranteedTime);
      console.log('longPressId set:', longPressStartId.current);

      timerId = setTimeout(() => {
        console.log('long press!');
        onLongPress();
        setClickStart(Infinity);
      }, resetTime);

      setClickStart(Date.now());
    } else {
      if (Date.now() > clickStart) { console.log('click!'); onShortPress(); }
      clearTimeout(timerId);
      console.log('clear longPressStartId:', longPressStartId.current);clearTimeout(longPressStartId.current);
      onLongPressCancel();
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