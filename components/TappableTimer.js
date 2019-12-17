import useTimer from '../hooks/timer';
import useLongPress from '../hooks/longPress';
import { useState } from 'react';
import { tappableTimerStyle } from '../styles';

import { StatusIndicator, BigStatusIndicator } from './StatusIndicator';
import { FlashingTimeDisplay, TimeDisplay } from './TimeDisplay';
import { FlashingProgressIndicator, ProgressIndicator } from './ProgressIndicator';

import { ResetBar } from './ResetBar';

const RESET_TIME = 1000;

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
      <ResetBar {...{resetBarState, setResetBarState}}/>

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