
const selectorRowStyle = <style>{`
.selector-row {
  width: 100vw;
  height: 20vh;
  background: #2a2b2d;
  display: flex;
  flex-direction: row;
  align-items: baseline;
}
`}</style>;

const selectableStyle = <style>{`
.selectable {
  width: 20vh;
  height: 20vh;
  background: #2a2b2d;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  font-size: 50px;
}

.name {

}

.selected {
  background: #4d8cf4;
}
`}</style>;

const Selectable = (props) => {
  let currClassName = 'selectable';
  if (props.selected) { currClassName += ' selected'; }
  return <div {...props} className={currClassName}>
    <div className="name">
      {props.name}
    </div>
    {selectableStyle}
  </div>
}

const SelectorRow = (props) => {
  let { setPickedTimeIdx, pickedTimeIdx, data } = props;

  let renderSelectables = (data) => {
    return data.map(({ name, ms }, i) => {
      return <Selectable selected={pickedTimeIdx === i} key={i} onClick={() => setPickedTimeIdx(i)} name={name} />
    });
  };

  return <div className="selector-row">
      { renderSelectables(data) }
    { selectorRowStyle }
  </div>;


}
export default SelectorRow;