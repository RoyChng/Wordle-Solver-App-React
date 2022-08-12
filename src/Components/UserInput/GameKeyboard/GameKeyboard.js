import styles from "./GameKeyboard.module.css";

function GameKeyboardRow1() {
  return (
    <div className={`${styles.keyboard__row1} ${styles.keyboard__row}`}>
      <div className={styles.keyboard__button}>Q</div>
      <div className={styles.keyboard__button}>W</div>
      <div className={styles.keyboard__button}>E</div>
      <div className={styles.keyboard__button}>R</div>
      <div className={styles.keyboard__button}>T</div>
      <div className={styles.keyboard__button}>Y</div>
      <div className={styles.keyboard__button}>U</div>
      <div className={styles.keyboard__button}>I</div>
      <div className={styles.keyboard__button}>O</div>
      <div className={styles.keyboard__button}>P</div>
    </div>
  );
}

function GameKeyboardRow2() {
  return (
    <div className={`${styles.keyboard__row2} ${styles.keyboard__row}`}>
      <div className={styles.keyboard__button}>A</div>
      <div className={styles.keyboard__button}>S</div>
      <div className={styles.keyboard__button}>D</div>
      <div className={styles.keyboard__button}>F</div>
      <div className={styles.keyboard__button}>G</div>
      <div className={styles.keyboard__button}>H</div>
      <div className={styles.keyboard__button}>J</div>
      <div className={styles.keyboard__button}>K</div>
      <div className={styles.keyboard__button}>L</div>
    </div>
  );
}

function GameKeyboardRow3() {
  return (
    <div className={`${styles.keyboard__row3} ${styles.keyboard__row}`}>
      <div
        className={`${styles.keyboard__button} ${styles["keyboard__button--del"]}`}
      >
        DEL
      </div>
      <div className={styles.keyboard__button}>Z</div>
      <div className={styles.keyboard__button}>X</div>
      <div className={styles.keyboard__button}>C</div>
      <div className={styles.keyboard__button}>V</div>
      <div className={styles.keyboard__button}>B</div>
      <div className={styles.keyboard__button}>N</div>
      <div className={styles.keyboard__button}>M</div>
      <div
        className={`${styles.keyboard__button} ${styles["keyboard__button--enter"]}`}
      >
        Enter
      </div>
    </div>
  );
}

function GameKeyboard(props) {
  const clickHandler = function (event) {
    if (Array.from(event.target.classList).includes(styles.keyboard__button)) {
      props.onAddLetter(event.target.innerHTML);
    }
  };

  return (
    <div className={styles.game__keyboard} onClick={clickHandler}>
      <GameKeyboardRow1></GameKeyboardRow1>
      <GameKeyboardRow2></GameKeyboardRow2>
      <GameKeyboardRow3></GameKeyboardRow3>
    </div>
  );
}

export default GameKeyboard;
