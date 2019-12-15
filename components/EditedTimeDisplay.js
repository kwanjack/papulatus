
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace } from '@fortawesome/free-solid-svg-icons'
import { useSpring, animated, useTransition } from 'react-spring'


const editedTimeStyle = <style jsx="true">{`

.edited-time-display {
  height: 20vh;
  width: 100vw;
  background: #2a2b2d;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 50px;
}

.backspace {
  flex: 1;
  align-items: center;
  display: flex;
  justify-content: center;
}

.backspace path {
}

.input-display-container {
  display: flex;
  flex-direction: row;
  flex: 4;
  align-items: center;
  justify-content: flex-end;
}
.input-display {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
}

.input-display .unit {
  font-size: 20px;
  padding: 0 5px;
}

`}</style>

const EditedTimeDisplay = (props) => {

  let { inputString, setInputString } = props;
  console.log('inputString:', inputString);
  console.log('inputString.length:', inputString.length);
  let slots = ['0','0','0','0'];
  let active = [false, false, false, false];

  let renderInputDisplay = (inputString) => {
    for (let i = 0; i < inputString.length; i++) {
      active[4-i-1] = true;
      slots[4-i-1] = inputString[inputString.length-i-1];
    }

    return <div className="input-display-container">
      <div className="input-display">
        <div>{slots[0]}</div>
        <div>{slots[1]}</div>
        <div className="unit">m</div>
        <div>{slots[2]}</div>
        <div>{slots[3]}</div>
        <div className="unit">s</div>
      </div>
    </div>;
  };

  let renderBackspace = () => {
    return <animated.div className="backspace"
      onClick={() => setInputString(oldInputString => oldInputString.slice(0, -1)) }>
      <FontAwesomeIcon icon={faBackspace} />
    </animated.div>
  };

  return <div className="edited-time-display">
    { renderInputDisplay(inputString) }
    { renderBackspace() }
    {editedTimeStyle}
  </div>
}

export default EditedTimeDisplay;