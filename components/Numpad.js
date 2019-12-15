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

.pad {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
}
`}</style>


const Numpad = (props) => {
  let { setInputString, inputString, setMode } = props;

  const MAX_CHAR = 4;
  let tryToAddToInput = (inputString, char) => {
    if (inputString.length === MAX_CHAR) { return; }
    return inputString + char;
  };
  let renderRows = () => {
    let result = [];
    let entries = [];
    for (let i = 1; i <= 9; i++) {
      entries.push({ view: `${i}`, onClick: () => setInputString(oldString => tryToAddToInput(oldString, `${i}`)) });
    }
    entries.push({ view: <FontAwesomeIcon icon={faAngleLeft}/>, onClick: () => setMode("TIMER") });
    entries.push({ view: '0', onClick: () => setInputString(oldString => tryToAddToInput(oldString, '0')) });
    entries.push({ view: <FontAwesomeIcon icon={faEdit}/>, onClick: () => {} });  

    for (let i = 0; i < 4; i++) {
      let currRow = [];
      for (let j = 0; j < 3; j++) {
        let entry = entries[i*3 + j];
        let pad = <div key={i+3+j} className="pad" onClick={entry.onClick}>
          <div className="pad-content">{entry.view}</div>
        </div>;
        currRow.push(pad);
      }
      result.push(<div key={i} className="numpad-row"> { currRow } </div>);
    }

    return result;
  }

  return <div className="numpad">
    { renderRows() }
    {numpadStyle}
  </div>
}

export default Numpad;