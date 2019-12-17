import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace, faEdit, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { useSpring, animated, useTransition } from 'react-spring'

const numpadStyle = <style jsx="true">{`

.numpad {
  height: 80vh;
  width: 100vw;
  background: #202123;
  display: flex;
  flex-direction: column;
}
.numpad-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex:1;
}


@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}


.pad {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
}

.submit {
  animation: 1s ease-out 0s 1 fadeIn;
}

.pad:active {
  background: #4d8cf4;
}

.dull:active {
  background: grey;
}

`}</style>


const Numpad = (props) => {
  let { setInputString, inputString, setMode, editId, setTimers } = props;

  const MAX_CHAR = 4;
  let tryToAddToInput = (inputString, char) => {
    if (inputString.length === 0 && char === '0') { return inputString; }
    if (inputString.length === MAX_CHAR) { return inputString; }
    return inputString + char;
  };

  let inputStringToMs = (inputString) => {
    let seconds = parseInt(inputString.slice(-2)) || 0;
    let minutes = parseInt(inputString.slice(0, -2)) || 0;

    let result = 0;
    result += seconds * 1000 + minutes * 60000;
    return result;
  };

  let renderRows = () => {
    let result = [];
    let entries = [];
    for (let i = 1; i <= 9; i++) {
      entries.push({ view: `${i}`, onClick: () => setInputString(oldString => tryToAddToInput(oldString, `${i}`)) });
    }
    entries.push({ view: <FontAwesomeIcon icon={faAngleLeft}/>, onClick: () => setMode("TIMER"), additionalClass: 'dull' });
    entries.push({ view: '0', onClick: () => setInputString(oldString => tryToAddToInput(oldString, '0')) });
    
    if (inputString.length === 0) {
      entries.push({ view: '', onClick: () => { }, additionalClass: 'dull'});  
    } else {
      entries.push({ view: <FontAwesomeIcon icon={faEdit}/>, onClick: () => {
        setTimers(oldTimers => {
          let newTimers = [...oldTimers];
          newTimers[editId] = inputStringToMs(inputString);
          return newTimers;
        });
        setInputString('');
        setMode('TIMER');
      },
      additionalClass: 'submit'
      });  
    }

    for (let i = 0; i < 4; i++) {
      let currRow = [];
      for (let j = 0; j < 3; j++) {
        let entry = entries[i*3 + j];
        let className = "pad";
        if (entry.additionalClass) { className = className + " " + entry.additionalClass; }
        let pad = <button key={i+3+j} className={className} onClick={entry.onClick}>
          <div className="pad-content">{entry.view}</div>
        </button>;
        currRow.push(pad);
      }
      result.push(<div key={i} className="numpad-row"> { currRow } </div>);
    }
    return result;
  }

  return <div className="numpad">
    { renderRows() }
    { numpadStyle }
  </div>
}

export default Numpad;