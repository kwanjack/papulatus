import useTimer from '../hooks/timer';
import useLongPress from '../hooks/longPress';
import { useSpring, animated, useTransition } from 'react-spring'
import { useState, useEffect, useRef } from 'react';
import { tappableTimerStyle } from '../styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
 

const RESET_TIME = 600;

const StatusIndicator = ({ isPaused }) => {
  console.log('paused:', isPaused);
  const playStyleProps = useSpring({ opacity: !isPaused ? 1 : 0 });
  const pauseStyleProps = useSpring({ opacity: isPaused ?  1 : 0 });

  const transitions = useTransition(isPaused, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 0.5 },
    leave: { opacity: 0 },
  });

  return <div className="status-indicator">
    {transitions.map(({ item, key, props }) => 
    item
      ? <animated.div key={key}style={props}><FontAwesomeIcon icon={faPause} /></animated.div>
      : <animated.div key={key}style={props}><FontAwesomeIcon icon={faPlay} /></animated.div>
    )}
  </div> 
};


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
    onShortPress: () => { console.log('short press!'); pause(); },
    onClickStart: () => { setResetBarState('MAX'); },
    onLongPressGuaranteed: () => {}, // () => { setResetBarState('MAX'); },
    onLongPressCancel: () => { setResetBarState('STANDBY'); }
  };

  let pretty = ms => {
    let minutes = Math.floor(ms / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);

    let content;

    if (minutes === 0) {
      content = <div className="time-left">
        <div className="time-quantity">{seconds}</div> <div className="time-unit">s</div>
      </div>;
    } else {
      content = <span className="time-left">
        <div className="time-quantity">{minutes}</div> <div className="time-unit">m</div>
        <div className="time-quantity">{seconds}</div> <div className="time-unit">s</div>
      </span>;
    }

    return content;


    
  }

  return <div className="tappable-timer" {...useLongPress(handlers, RESET_TIME)}>
      <div className="time-left-wrapper">
        { pretty(msLeft) }
      </div>
      <ResetProgressIndicator {...{resetBarState, setResetBarState}}/>
      <ProgressIndicator {...{msLeft, pickedTime, isPaused}} />
      <StatusIndicator {...{isPaused}} />
    { tappableTimerStyle }
    </div>
}

export default TappableTimer;