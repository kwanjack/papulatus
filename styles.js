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

.progress-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  height: -webkit-calc(100% - 0px);
}
.progress-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  background: #4d8cf4;
  width: 100vw;
}

.flashing-progress-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  background: #4d8cf4;
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

.reset-text {
  color: black;
}

.reset-indicator {
  position: absolute;
  height: 100%;
  background: white;
}

.reset-background {
  background: white;
  opacity: 0.5;
  width: 100%;
  text-align: center;
  font-size: 15px;
  height: 100%;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.status-indicator {
  position: absolute;
  bottom: 100px;
  left: 20px;
  font-size: 80px;
  z-index: 30;
}


.status-indicator path{

}

.reset-background path{
  color: black;
}

.reset-icon {
  padding: 5px;
}

`}</style>;