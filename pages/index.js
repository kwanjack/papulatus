
import useTimer from '../hooks/timer';

const Index = () => {
  let { msLeft, start, pause, reset } = useTimer();

  return <div>
      <p>Hello Next.js</p>
      <div>{ msLeft }</div>
      <button onClick={pause}>pause</button>
      <button onClick={() => start(Date.now() + 5000)}>start</button>
      <button onClick={reset}>reset</button>
    </div>
  };
  
  export default Index;