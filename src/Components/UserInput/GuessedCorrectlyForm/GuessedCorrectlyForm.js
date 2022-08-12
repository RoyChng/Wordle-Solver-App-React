import styles from "./GuessedCorrectlyForm.module.css";

export default function GuessedCorrectlyForm(props) {
  const clickHandler = function (event) {
    props.onGuessCorrectly(event.target.innerHTML.toLowerCase());
  };

  return (
    <div className={styles["guessed__correctly--container"]}>
      <div className={styles["guessed__correctly--form"]}>
        <h3>Was the guess correct?</h3>
        <div
          className={styles["guessed__correctly--btns"]}
          onClick={clickHandler}
        >
          <button className={`${styles.btn} ${styles.btn__yes}`}>Yes</button>
          <button className={`${styles.btn} ${styles.btn__no}`}>No</button>
        </div>
      </div>
    </div>
  );
}
