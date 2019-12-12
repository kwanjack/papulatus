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

.time-left {
  font-size: 90px;
}

.click-indicator {
  opacity: 0.5;
  position: absolute;
  bottom: 0;
  left: 0;
  background: red;
  width: 100vw;
}
`}</style>;

const TappableTimer = (props) => {
  let { pickedTime } = props;
  let { msLeft, start, pause, reset } = useTimer(pickedTime);
  let [ percent, setPercent ] = useState(0);

  const [styleProps, set, stop] = useSpring(() => ({height: '0%', duration: 10000 }));

  let onClickStart = () => {
    set({ height: '90%', config: { duration: 10000 }});
    setTimeout(() => set({ height: '0%',  }), 1000);
  };
  const backspaceLongPress = useLongPress(reset, pause, onClickStart, 1000);

  let pretty = ms => {
    let seconds = parseInt(ms / 1000);
    let milliseconds = parseInt((ms % 1000) / 10);
    return `${seconds}:${milliseconds}`;
  }


  return <div className="tappable-timer"
      {...backspaceLongPress}>   
      <div className="time-left"> { pretty(msLeft)} </div>
      <animated.div className="click-indicator" style={styleProps}>I will fade in</animated.div>
    { tappableTimerStyle }
    </div>
}


export default TappableTimer;