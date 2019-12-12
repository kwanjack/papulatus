
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

const Index = () => {
  let [ pickedTime, setPickedTime] = useState(5000);

  return <div className="app">
      <SelectorRow setPickedTime = {setPickedTime}/>
      <TappableTimer pickedTime={pickedTime} />
      { appStyle }
    </div>
  };
  
  export default Index;