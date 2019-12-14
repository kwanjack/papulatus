
import TappableTimer from '../components/TappableTimer';
import SelectorRow from '../components/SelectorRow';
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


const DATA = [
  { name: '5s', ms: 5000 },
  { name: '30s', ms: 30000 },
  { name: '90s', ms: 90000 },
];


const Index = () => {
  let [ pickedTimeIdx, setPickedTimeIdx ] = useState(0);

  return <div className="app">
      <SelectorRow pickedTimeIdx={pickedTimeIdx} setPickedTimeIdx={setPickedTimeIdx} data={DATA} />
      <TappableTimer pickedTime={DATA[pickedTimeIdx].ms} />
      { appStyle }
    </div>
  };
  
  export default Index;