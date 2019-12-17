
import TappableTimer from '../components/TappableTimer';
import SelectorRow from '../components/SelectorRow';
import TimerEdit from '../components/TimerEdit';

import { useState, useEffect } from 'react';

import {Howl, Howler} from 'howler';
import Head from 'next/head'


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


const useAudio = url => {
  const [audio] = useState(new Howl({ src: url, loop: true, }));
  const [playing, setPlaying] = useState(false);
  useEffect(() => { playing ? audio.play() : audio.pause(); }, [playing]);
  return [playing, () => setPlaying(true), () => setPlaying(false)];
};

const DEFAULT_DATA = [ 5000, 30000, 90000 ];
const Index = () => {
  let [ timers, setTimers ] = useState(DEFAULT_DATA);
  let [ pickedTimeIdx, setPickedTimeIdx ] = useState(0);
  let [ mode, setMode ] = useState('TIMER'); // 'TIMER' or 'EDIT'
  let [ editId, setEditId ] = useState(0);
  let [ playing, ring, stop] = useAudio('/audio/alarm.mp3');

  useEffect(() => {
    let userTimers = JSON.parse(localStorage.getItem('userTimers'));
    if (userTimers) {
      setTimers(userTimers);
    } else {
      localStorage.setItem('userTimers', JSON.stringify(DEFAULT_DATA));
      setTimers(DEFAULT_DATA);
    }
  }, []);

  let setTimersWrapper = (f) => {
    setTimers(f);
    let newVal = f(timers);
    localStorage.setItem('userTimers', JSON.stringify(newVal));
  }

  let header = <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <title>Timer</title>
  </Head>;

  return <div className="app">
      { header }
      <TimerEdit {...{ mode, editId, setMode, setTimers: setTimersWrapper }}/>
      <SelectorRow data={timers} {...{pickedTimeIdx, setPickedTimeIdx, setMode, setEditId, mode }}/>
      <TappableTimer {...{onReset: stop, onTimeLimitReached: ring, mode }} pickedTime={timers[pickedTimeIdx]} />
      { appStyle }
    </div>
  };
  
  export default Index;