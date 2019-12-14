export const tappableTimerStyle = <style>{`
.tappable-timer {
  width: 100%;
  height: 80vh;
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
  z-index: 50;
}

.time-left {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  vertical-align: text-bottom;
}

.time-quantity {
  vertical-align: text-bottom;
}

.time-unit {
  font-size: 30px;
  vertical-align: text-bottom;
  margin-right: 10px;
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
  height: 40px;
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

.status-indicator {
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 50px;
  z-index: 30;
}


.status-indicator path{

}

`}</style>;