import useTimer from '../hooks/timer';
import useLongPress from '../hooks/longPress';
import { useSpring, animated, useTransition } from 'react-spring'
import { useState, useEffect, useRef } from 'react';
import { tappableTimerStyle } from '../styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faBell, faUndo } from '@fortawesome/free-solid-svg-icons'
 
const RESET_TIME = 1000;

const StatusIndicator = ({ msLeft, pickedTime, isPaused }) => {
  let status = 'PLAY';
  if (pickedTime === msLeft) {
    status = 'RESET';
  } else if (msLeft === 0) {
    status = 'BEEP';
  } else if (isPaused) {
    status = 'PAUSE';
  };

  const transitions = useTransition(status, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 0.5 },
    leave: { opacity: 0 },
  });

  let icons = {
    PLAY:  faPlay,
    PAUSE:  faPause,
    RESET:  faUndo,
    BEEP:  faBell
  }
  return <div className="status-indicator">
    {transitions.map(({ item, key, props }) => <animated.div key={key} style={props}><FontAwesomeIcon icon={icons[item]} /></animated.div>  )}
  </div> 
};

const BigStatusIndicator = ({ msLeft, pickedTime, isPaused }) => {
  let status = 'PLAY';
  if (pickedTime === msLeft) {
    status = 'RESET';
  } else if (msLeft === 0) {
    status = 'BEEP';
  } else if (isPaused) {
    status = 'PAUSE';
  };

  const transitions = useTransition(status, status => status, {
    from: { position: 'absolute', opacity: 0 },
    enter: [{ opacity: 0.1 }, { opacity: 0} ],
    leave: { opacity: 0 },
  });
  let icons = { PLAY:  faPlay, PAUSE:  faPause, RESET:  faUndo, BEEP:  faBell };
  return <div className="big-status-indicator">
    {transitions.map(({ item, key, props }) => <animated.div key={key} style={props}><FontAwesomeIcon icon={icons[item]} /></animated.div>  )}
  </div> 
};

const ProgressIndicator = ({ msLeft, pickedTime, isPaused }) => {
  let totalSeconds = Math.floor(pickedTime / 1000);
  let secondsLeft = Math.floor(msLeft / 1000);
  let secondsElapsed = Math.floor((pickedTime - msLeft) / 1000);
  let percentage = Math.ceil(secondsElapsed / totalSeconds * 100);
  let progressProps = { opacity: 0.3, height: `${percentage}%` };

  return <animated.div className="progress-indicator" style={useSpring(progressProps)}></animated.div>;
}

const FlashingProgressIndicator = ({ msLeft, pickedTime, isPaused }) => {
  let percentage = 100;
  let flashingProps = {
    from: { opacity: 0.3, height: `${percentage}%` },
    to: async next => {
      while (1) {
        await next({ opacity: 0.3, height: `${percentage}%` });
        await next({ opacity: 0, height: `${percentage}%` });
      }
    },
    config: { tension: 400 }
  };
  return <animated.div className="flashing-progress-indicator" style={useSpring(flashingProps)}></animated.div>;
}


const ResetProgressIndicator = ({ resetBarState, setResetBarState }) => {
  const indicatorStates = {
    STANDBY: { height: '100%', width: '0%', opacity: 0},
    START: {},
    MAX: { height: '100%', width: '100%', opacity: 0.5},
    FINISH: { height: '100%', width: '0%', opacity: 0 }
  };

  const indicatorStyleProps = useSpring(indicatorStates[resetBarState]);
  const resetContainerStates =  {
    STANDBY: { opacity: 0.1 },
    START: { opacity: 0.5 },
    MAX: { opacity: 1 },
    FINISH: {  }
  };

  const backgroundStates = {
    STANDBY: {
      to: async (next, cancel) => { await next({ height: '0%', opacity: 0.5, color: 'white'}) },
      from: {height: '0%', opacity: 0, color: 'white'},
    },
    START: {
      to: async (next, cancel) => { await next({height: '100%', color: 'white'}) },
      from: {height: '0%', color: 'white'},
    },
    MAX: {}, FINISH: {},
  };
  
  const backgroundProps = useSpring(backgroundStates[resetBarState]);

  const resetTextStyleProps = useSpring(resetContainerStates[resetBarState]);

  // return <animated.div className="reset-indicator" style={indicatorStyleProps}></animated.div>;
  return <div className="reset-indicator-container">
    <animated.div className="reset-background" style={backgroundProps}>
      <animated.div className="reset-indicator" style={indicatorStyleProps}></animated.div>
    </animated.div>
    <animated.div className="reset-icon-container" style={resetTextStyleProps}>
      <div className="reset-text"> RESET </div>
      <FontAwesomeIcon className="reset-icon" icon={faUndo} />
    </animated.div>
  </div>
}

const FlashingTimeDisplay = ({ms, isPaused, pickedTime}) => {
  let doPauseAnimation = isPaused;
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

const TimeDisplay = ({ms, isPaused, pickedTime}) => {
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

const displayTime = (ms, isPaused, pickedTime) => {
  let doPauseAnimation = isPaused;
  if (ms === 0) { doPauseAnimation = false; }
  if (ms === pickedTime) { doPauseAnimation = false; }

  if (doPauseAnimation) {
    return <FlashingTimeDisplay {...{ms, isPaused, pickedTime}} />;
  } else {
    return <TimeDisplay {...{ms, isPaused, pickedTime}} />;
  }
};

const TappableTimer = (props) => {
  let { pickedTime, onReset, onTimeLimitReached } = props;
  let { pickedTime: picked, msLeft, start, pause, reset, isPaused } = useTimer(pickedTime, onTimeLimitReached, onReset);
  let [resetBarState, setResetBarState] = useState('STANDBY');

  let handlers = {
    onLongPress:  () => { reset(); setResetBarState('FINISH'); },
    onShortPress: () => {
      if (msLeft === 0) {
        setResetBarState('START');
        reset();
      } else {
        pause();
      }
    },
    onClickStart: () => { setResetBarState('START'); },
    onLongPressGuaranteed: () => { setResetBarState('MAX'); },
    onLongPressCancel: () => {
      setResetBarState('STANDBY');
    }
  };

  return <div className="tappable-timer" {...useLongPress(handlers, RESET_TIME, 300)} style={{ display: props.mode === 'EDIT' ? "none" : "flex" }}>
      <div className="time-left-wrapper">
        { displayTime(msLeft, isPaused, picked) }
      </div>
      <ResetProgressIndicator {...{resetBarState, setResetBarState}}/>

      <div className="progress-wrapper">
        { msLeft === 0
          ? <FlashingProgressIndicator />
          : <ProgressIndicator {...{msLeft, pickedTime, isPaused}} />
        }
      </div>
      <StatusIndicator {...{msLeft, pickedTime, isPaused}} />
      <BigStatusIndicator {...{msLeft, pickedTime:picked, isPaused}} />

    { tappableTimerStyle }
    </div>
}

export default TappableTimer;