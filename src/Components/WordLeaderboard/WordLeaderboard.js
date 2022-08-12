import styles from "./WordLeaderboard.module.css";
import LeaderboardRow from "./LeaderboardRow";

function WordLeaderboard(props) {
  let leaderboardScores;
  const [bestWordsList, wordsListType] = props.bestWordsList;
  if (wordsListType === "instruction") {
    leaderboardScores = (
      <div className={styles.leaderboard__instructions}>
        <p>{bestWordsList}</p>
      </div>
    );
  } else {
    leaderboardScores = (
      <div className={styles.leaderboard__scores}>
        {bestWordsList.map(([word, score], i) => (
          <LeaderboardRow
            word={word}
            score={score}
            first={i === 0 ? 1 : 0}
            key={word + (score || "final").toString()}
          ></LeaderboardRow>
        ))}
      </div>
    );
  }
  return (
    <div className={styles.leaderboard}>
      <div className={styles.leaderboard__header}>
        <h2>Word</h2>
        <h2>Future Reduction</h2>
      </div>
      <hr className={styles.leaderboard__divider}></hr>
      {leaderboardScores}
    </div>
  );
}

export default WordLeaderboard;
