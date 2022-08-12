import styles from "./GameGrid.module.css";
import GridRow from "./GridRow";

function GameGrid(props) {
  const [currentRow, currentColumn] = props.currentRowColumn;
  return (
    <div className={styles.game__grid}>
      <div className={styles["game__instructions"]}>
        <h2 className={styles["game__instructions--text"]}>
          {props.gameInstruction}
        </h2>
      </div>
      <div className={styles["grid__rows--container"]}>
        {props.wordsEntered.words.map((word, i) => {
          return (
            <GridRow
              word={word}
              wordMarking={props.wordsEntered.wordMarking[i]}
              selectedRow={i === currentRow}
              selectedColumn={currentColumn}
              rowNum={i}
              key={
                word.join("") +
                props.wordsEntered.wordMarking[i].join("") +
                i.toString()
              }
            ></GridRow>
          );
        })}
      </div>
    </div>
  );
}

export default GameGrid;
