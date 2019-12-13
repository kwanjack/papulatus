import useTimer from '../hooks/timer';
import useLongPress from '../hooks/longPress';
import { useSpring, animated } from 'react-spring'
import { useState } from 'react';

const tappableTimerStyle = <style>{`
.tappable-timer {
  width: 100%;
  height: 70vh;
  background: #202123;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  position: relative;
}

.time-left-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  font-size: 90px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.time-left {

}

.progress-indicator {
  opacity: 0.3;
  position: absolute;
  bottom: 0;
  left: 0;
  background: red;
  width: 100vw;
}

.reset-indicator {
  height: 20px;
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  opacity: 0.4;
}

`}</style>;

const TappableTimer = (props) => {
  let { pickedTime } = props;
  let { msLeft, start, pause, reset, isPaused } = useTimer(pickedTime);
  let [ percent, setPercent ] = useState(0);
  let [resetBarState, setResetBarState] = useState('STANDBY');

  const RESET_TIME = 400;
  const TO_SNAP_TIME = 100;
  const SNAP_OVER = 300;

  let UNPAUSED = { height: '100%', config: { duration: msLeft } };
  let PAUSED = { height: `${100 - parseInt(msLeft / pickedTime * 100)}%` };
  const styleProps = useSpring(isPaused ? PAUSED : UNPAUSED);

  const STANDBY = { to: async (next, cancel) => {
      await next({ opacity: 0, config: { duration: 200 } });
      await next({ width: '0%', config: { duration: 100 } });
    },
    from: { width: '100%', opacity: 0 }
  };

  const MID = { width: '40%', opacity: 1, config: { duration: TO_SNAP_TIME }};

  const MAX = { to: async (next, cancel) => {
    await next({ width: '100%', config: { duration: RESET_TIME } });
    setResetBarState('STANDBY');
  },
    from: { width: '5%' }
  };

  const resetStates = { STANDBY, MID, MAX };

  const resetStyleProps = useSpring(resetStates[resetBarState]);

  let onClickStart = () => {
    setResetBarState('MID');
  };

  let onLongPressGuaranteed =  async () => {
    console.log('long press guarnateed start');
    setResetBarState('MAX');
    // let a = resetSet({ width: '100%', config: { duration: 6000 }});
  }

  let onLongPressCancel = () => {
    setResetBarState('STANDBY');
    // resetSet({ width: '5%', config: { duration: 100 }});
  }

  let onPause = () => {
    pause();
  }

  let onReset = () => {
    reset();
  };

  let handlers = {
    onLongPress: onReset,
    onShortPress: onPause,
    onClickStart,
    onLongPressGuaranteed,
    onLongPressCancel
  };


  let pretty = ms => {
    let seconds = parseInt(ms / 1000);
    let milliseconds = parseInt((ms % 1000) / 10);
    return `${seconds}:${milliseconds}`;
  }

  return <div className="tappable-timer" {...useLongPress(handlers,  TO_SNAP_TIME + SNAP_OVER, SNAP_OVER)}>
      <div className="time-left-wrapper">
        <div className="time-left"> { pretty(msLeft) } </div>
      </div>
      <animated.div className="reset-indicator" style={resetStyleProps}></animated.div>
      <animated.div className="progress-indicator" style={styleProps}></animated.div>
    { tappableTimerStyle }
    </div>
}


export default TappableTimer;