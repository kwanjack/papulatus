
import TappableTimer from '../components/TappableTimer';
import SelectorRow from '../components/SelectorRow';
import TimerEdit from '../components/TimerEdit';

import { useState } from 'react';

const appStyle = <style jsx="true" global>{`
* {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
  color: white;
}

.app {
  font: 20px Arial;
  height: 100vh;
  width: 100vw;
  color: white;
}
`}  
</style>


const DATA = [ 5000, 30000, 90000 ];
const Index = () => {

  let [timers, setTimers] = useState(DATA);
  let [ pickedTimeIdx, setPickedTimeIdx ] = useState(0);
  let [ mode, setMode ] = useState('TIMER'); // 'TIMER' or 'EDIT'
  let [ editId, setEditId ] = useState(0);

  if (mode === 'EDIT') {
    return <div className="app">
      <TimerEdit {...{ editId, setMode, setTimers }}/>
      { appStyle }
    </div>
  }

  return <div className="app">
      <SelectorRow data={timers} {...{pickedTimeIdx, setPickedTimeIdx, setMode, setEditId }}/>
      <TappableTimer pickedTime={timers[pickedTimeIdx]} />
      { appStyle }
    </div>
  };
  
  export default Index;