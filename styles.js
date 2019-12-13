export const tappableTimerStyle = <style>{`
.tappable-timer {
  width: 100%;
  height: 70vh;
  background: #202123;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  position: relative;
}

.time-left-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  font-size: 90px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.time-left {

}

.progress-indicator {
  opacity: 0.3;
  position: absolute;
  bottom: 0;
  left: 0;
  background: red;
  width: 100vw;
}

.reset-indicator-container {
  height: 20px;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  color: black;
}

.reset-indicator {
  position: absolute;
  height: 100%;
  background: red;
}

.reset-background {
  background: white;
  opacity: 0.5;
  width: 100%;
  text-align: center;
  font-size: 15px;
  height: 100%;
  color: black;
}

`}</style>;