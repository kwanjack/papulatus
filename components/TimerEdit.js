
import EditedTimeDisplay from './EditedTimeDisplay';
import Numpad from './Numpad';
import { useSpring, animated, useTransition } from 'react-spring'
import { useState } from 'react';

const timerEditStyle = <style jsx="true">{`

`}  
</style>


const SelectorRow = (props) => {
  let { editId, setMode, setTimers } = props;
  let [inputString, setInputString] = useState('');

  return <div className="EDITOR">
    <EditedTimeDisplay {...{inputString, setInputString}}/>
    <Numpad {...{setMode, inputString, setInputString}}/>
  </div>;
}

export default SelectorRow;