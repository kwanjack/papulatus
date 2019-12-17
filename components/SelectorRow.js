import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import useLongPress from '../hooks/longPress';

import { useSpring, animated, useTransition } from 'react-spring';
import { useState } from 'react';

import { selectorRowStyle, selectableStyle } from '../styles';

const ResetProgressIndicator = ({ resetBarState, setResetBarState }) => {
  const STANDBY = { width: '0%', opacity: 0.1};
  const FINISH = { opacity: 0.1, };
  const START = {}; 
  const MAX = { width: '100%', opacity: 0.8 };

  const resetStates = { STANDBY, START, MAX, FINISH };
  const resetStyleProps = useSpring(resetStates[resetBarState]);
  const resetContainerStates =  {
    STANDBY: { opacity: 0.1 },
    START: { opacity: 0.5 },
    MAX: { opacity: 0.5 },
    FINISH: { opacity: 0.1 }
  };

  const resetContainerStyleProps = useSpring(resetContainerStates[resetBarState]);

  // return <animated.div className="reset-indicator" style={resetStyleProps}></animated.div>;
  return <div className="edit-indicator-container">
    <animated.div className="edit-indicator" style={resetStyleProps}></animated.div>
    <animated.div className="edit-background" style={resetStyleProps}> </animated.div>
    <animated.div className="edit-icon-container" style={resetContainerStyleProps}>
      <FontAwesomeIcon className="edit-icon" icon={faEdit} />
    </animated.div>
  </div>
}


const Selectable = (props) => {
  let currClassName = 'selectable';
  let [resetBarState, setResetBarState] = useState('STANDBY');
  let { ms } = props;

  let { setMode, setEditId } = props;
  let handlers = {
    onLongPress:  () => { setEditId(props.idx); setMode('EDIT'); setResetBarState('FINISH'); },
    onShortPress: () => { props.setPickedTimeIdx(props.idx) },
    onClickStart: () => { setResetBarState('START'); },
    onLongPressGuaranteed:  () => { setResetBarState('MAX'); },
    onLongPressCancel: () => { setResetBarState('STANDBY'); }
  };

  if (props.selected) { currClassName += ' selected'; }
  return <div className={currClassName} {...useLongPress(handlers, 1000, 300)} > 
    <ResetProgressIndicator {...{resetBarState, setResetBarState}} />
    <div className="name"> <TimeDisplay ms={ms}/> </div>
    {selectableStyle}
  </div>
}

const TimeDisplay = ({ms}) => {
  let minutes = Math.floor(ms / 60000);
  let seconds = Math.floor((ms % 60000) / 1000);
  return <span className="selector-time-left">
    { minutes > 0 ? <div className="selector-quantity">{minutes}</div>  : null }
    { minutes > 0 ? <div className="selector-time-unit">m</div> : null }
    <div className="selector-time-quantity">{seconds}</div> <div className="selector-time-unit">s</div>
  </span>;
}

const SelectorRow = (props) => {
  let { setPickedTimeIdx, pickedTimeIdx, data } = props;

  let renderSelectables = (data) => {
    return data.map((ms, i) => {
      return <Selectable {...{...props, ms}} selected={pickedTimeIdx === i} key={i} idx={i} />
    });
  };


  return <div className="selector-row" style={{ display: props.mode === 'EDIT' ? "none" : "flex"  }}>
      { renderSelectables(data) }
    { selectorRowStyle }
  </div>;


}
export default SelectorRow;