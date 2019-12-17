import { useState, useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';


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

      timerId = setTimeout(() => {
        onLongPress();
        setClickStart(Infinity);
      }, resetTime);

      setClickStart(Date.now());
    } else {
      if (Date.now() > clickStart) { onShortPress(); }
      clearTimeout(timerId);
      clearTimeout(longPressStartId.current);
      onLongPressCancel();
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [startLongPress]);

  if (isMobile) {
    return {
      onTouchStart: () => { /*console.log('onTouchStart'); */ setStartLongPress(true); },
      onTouchEnd: () => { /*console.log('onTouchEnd'); */ setStartLongPress(false); },
    }
  } else {
    return {
      onMouseDown: () => { /*console.log('onMouseDown');*/ setStartLongPress(true); },
      onMouseUp: () => { /*console.log('onMouseUp'); */ setStartLongPress(false); },
      onMouseLeave: () => { /*console.log('onMouseLeave'); */ setStartLongPress(false); },
    }
  }
}