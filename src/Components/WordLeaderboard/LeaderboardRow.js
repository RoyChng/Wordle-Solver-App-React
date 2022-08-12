import styles from "./LeaderboardRow.module.css";

function LeaderboardRow(props) {
  return (
    <div className={`${styles.row} ${props.first ? styles.first__row : ""}`}>
      <div className={styles.row__word}>{props.word}</div>
      <div className={styles["row__score--container"]}>
        <div className={styles.row__score}>{props.score}</div>
      </div>
    </div>
  );
}

export default LeaderboardRow;
