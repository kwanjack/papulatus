import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons'


export const ResetBar = ({ resetBarState }) => {
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
