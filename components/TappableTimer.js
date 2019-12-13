import useTimer from '../hooks/timer';
import useLongPress from '../hooks/longPress';
import { useSpring, animated } from 'react-spring'
import { useState, useEffect, useRef } from 'react';
import { tappableTimerStyle } from '../styles';
import * as easings from 'd3-ease'

const RESET_TIME = 600;

const ProgressIndicator = ({ msLeft, pickedTime, isPaused }) => {
  let totalSeconds = Math.floor(pickedTime / 1000);
  let secondsLeft = Math.floor(msLeft / 1000);
  let secondsElapsed = Math.floor((pickedTime - msLeft) / 1000);
  let percentage = Math.ceil(secondsElapsed / totalSeconds * 100);  
  let PAUSED = { height: `${percentage}%` };
  const progressStyleProps = useSpring(PAUSED);
  return <animated.div className="progress-indicator" style={progressStyleProps}></animated.div>
}

const ResetProgressIndicator = ({ resetBarState, setResetBarState }) => {
  console.log('newState:', resetBarState);
  const STANDBY = { width: '0%', opacity: 0 };
  const FINISH = { opacity: 0, };
  const MAX = { width: '100%', opacity: 0.8 };

  const resetStates = { STANDBY, MAX, FINISH };
  const resetStyleProps = useSpring(resetStates[resetBarState]);
  const resetContainerStates =  {
    STANDBY: { opacity: 0 },
    MAX: { opacity: 0.3 },
    FINISH: { opacity: 0 }
  };

  const resetContainerStyleProps = useSpring(resetContainerStates[resetBarState]);

  // return <animated.div className="reset-indicator" style={resetStyleProps}></animated.div>;
  return <div className="reset-indicator-container">
    <animated.div className="reset-indicator" style={resetStyleProps}></animated.div>
    <animated.div className="reset-background" style={resetContainerStyleProps}> HOLD TO RESET </animated.div>
  </div>
}

const TappableTimer = (props) => {
  let { pickedTime } = props;
  let { msLeft, start, pause, reset, isPaused } = useTimer(pickedTime);
  let [resetBarState, setResetBarState] = useState('STANDBY');

  let handlers = {
    onLongPress:  () => { reset(); setResetBarState('FINISH'); },
    onShortPress: () => { pause(); },
    onClickStart: () => { setResetBarState('MAX'); },
    onLongPressGuaranteed: () => {}, // () => { setResetBarState('MAX'); },
    onLongPressCancel: () => { setResetBarState('STANDBY'); }
  };

  let pretty = ms => {
    let seconds = parseInt(ms / 1000);
    let milliseconds = parseInt((ms % 1000) / 10);
    return `${seconds}:${milliseconds}`;
  }

  return <div className="tappable-timer" {...useLongPress(handlers, RESET_TIME)}>
      <div className="time-left-wrapper">
        <div className="time-left"> { pretty(msLeft) } </div>
      </div>
      <ResetProgressIndicator {...{resetBarState, setResetBarState}}/>
      <ProgressIndicator {...{msLeft, pickedTime, isPaused}}/>
    { tappableTimerStyle }
    </div>
}

export default TappableTimer;