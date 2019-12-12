import useTimer from '../hooks/timer';

const tappableTimerStyle = <style>{`
.tappable-timer {
  width: 100%;
  height: 100%;
  background: #202123;
}
`}</style>;

const TappableTimer = (props) => {
  let { pickedTime } = props;
  let { msLeft, start, pause, reset } = useTimer(pickedTime);

  return <div className="tappable-timer">
      <div> {msLeft} </div>
      <button onClick={pause}>pause</button>
      <button onClick={start}>start</button>
      <button onClick={reset}>reset</button>
    { tappableTimerStyle }
  </div>;


}
export default TappableTimer;