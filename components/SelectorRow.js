
const selectorRowStyle = <style>{`
.selector-row {
  width: 100vw;
  height: 30vh;
  background: #2a2b2d;
  display: flex;
  flex-direction: row;
}
`}</style>;

const selectableStyle = <style>{`
.selectable {
  width: 30vh;
  height: 30vh;
  background: #2a2b2d;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
}

.name {

}
`}</style>;

const Selectable = (props) => {
  return <div {...props} className="selectable">
    <div className="name">
      {props.name}
    </div>
    {selectableStyle}
  </div>

}

const SelectorRow = (props) => {
  let { setPickedTime } = props;
  return <div className="selector-row">
      <Selectable onClick={() => setPickedTime(3000)} name="3s"/>
      <Selectable onClick={() => setPickedTime(5000)} name="5s"/>
      <Selectable onClick={() => setPickedTime(7000)} name="7s"/>
    { selectorRowStyle }
  </div>;


}
export default SelectorRow;