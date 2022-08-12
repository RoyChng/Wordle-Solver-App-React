import styles from "./GridRow.module.css";

function WordBox(props) {
  // console.log(props.letterMarking);
  return (
    <div
      className={`${styles.letter__box} ${styles[props.letterMarking]} ${
        props.selectedColumn ? styles.active : ""
      } ${props.selectedRow ? styles["active__row"] : ""}`}
    >
      {props.letter}
    </div>
  );
}

function GridRow(props) {
  const rowNumString = props.rowNum.toString();
  const selectedColumn = props.selectedRow ? props.selectedColumn : false;
  return (
    <div className={styles.row}>
      {props.word.map((letter, i) => {
        return (
          <WordBox
            letter={letter}
            letterMarking={props.wordMarking[i]}
            selectedColumn={
              selectedColumn === 0 || selectedColumn
                ? selectedColumn === i
                : false
            }
            selectedRow={props.selectedRow}
            key={letter + props.wordMarking[i] + rowNumString + i.toString()}
          ></WordBox>
        );
      })}
    </div>
  );
}

export default GridRow;
