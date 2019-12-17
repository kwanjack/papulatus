
import EditedTimeDisplay from './EditedTimeDisplay';
import Numpad from './Numpad';
import { useSpring, animated, useTransition } from 'react-spring'
import { useState } from 'react';

const timerEditStyle = <style jsx="true">{`
  .editor {
    display: flex;
    flex-direction: column;
  }
`}  
</style>


const SelectorRow = (props) => {
  let { editId, setMode, setTimers, mode } = props;
  let [inputString, setInputString] = useState('');

  let className = (mode === 'EDIT') ? 'editor current' : 'editor';

  return <div className={className} style={{ display: props.mode === 'EDIT' ? "flex" : "none" }}>
    <EditedTimeDisplay {...{inputString, setInputString}}/>
    <Numpad {...{setMode, editId, inputString, setInputString, setTimers}}/>
    {timerEditStyle}
  </div>;
}

export default SelectorRow;