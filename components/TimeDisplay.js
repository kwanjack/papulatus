import { useSpring, animated, useTransition } from 'react-spring'
import { useState, useEffect, useRef } from 'react';

export const FlashingTimeDisplay = ({ms, isPaused, pickedTime}) => {
  let minutes = Math.floor(ms / 60000);
  let seconds = Math.floor((ms % 60000) / 1000);
  const PAUSED = {
    from: { opacity: 1 },
    to: async next => {
      while (1) {
        await next({ opacity: 0 });
        await next({ opacity: 1 });
      }
    }, config: { tension: 400 }
  };

  const timeStyleProps = useSpring(PAUSED);

  return <animated.span style={timeStyleProps} className="time-left">
    { minutes > 0 ? <div className="time-quantity">{minutes}</div>  : null }
    { minutes > 0 ? <div className="time-unit">m</div> : null }
    <div className="time-quantity">{seconds}</div> <div className="time-unit">s</div>
  </animated.span>;    
}
  
export const TimeDisplay = ({ms, isPaused, pickedTime}) => {
  let doPauseAnimation = isPaused;
  if (ms === 0) { doPauseAnimation = false; }
  if (ms === pickedTime) { doPauseAnimation = false; }

  let minutes = Math.floor(ms / 60000);
  let seconds = Math.floor((ms % 60000) / 1000);
  const UNPAUSED = { opacity: 1 };
  const timeStyleProps = useSpring(UNPAUSED);

  return <animated.span style={timeStyleProps} className="time-left">
    { minutes > 0 ? <div className="time-quantity">{minutes}</div>  : null }
    { minutes > 0 ? <div className="time-unit">m</div> : null }
    <div className="time-quantity">{seconds}</div> <div className="time-unit">s</div>
  </animated.span>;
}
