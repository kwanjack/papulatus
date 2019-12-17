import { faPlay, faPause, faBell, faUndo } from '@fortawesome/free-solid-svg-icons'
import { useSpring, animated, useTransition } from 'react-spring'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const StatusIndicator = ({ msLeft, pickedTime, isPaused }) => {
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
  
  export const BigStatusIndicator = ({ msLeft, pickedTime, isPaused }) => {
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