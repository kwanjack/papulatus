import { useSpring, animated, useTransition } from 'react-spring';

export const ProgressIndicator = ({ msLeft, pickedTime, isPaused }) => {
  let totalSeconds = Math.floor(pickedTime / 1000);
  let secondsElapsed = Math.floor((pickedTime - msLeft) / 1000);
  let percentage = Math.ceil(secondsElapsed / totalSeconds * 100);
  let progressProps = { opacity: 0.3, height: `${percentage}%` };

  return <animated.div className="progress-indicator" style={useSpring(progressProps)}></animated.div>;
}
  
export const FlashingProgressIndicator = ({ msLeft, pickedTime, isPaused }) => {
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
  