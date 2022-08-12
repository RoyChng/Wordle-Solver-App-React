import styles from "./WordMarkingSelector.module.css";

function GenerateWordsBtn(props) {
  return (
    <button className={styles.btn__generate} onClick={props.onGenerateWords}>
      Generate Best Possible Word
    </button>
  );
}

function WordMarkingSelector(props) {
  const clickHandler = function (event) {
    const classList = Array.from(event.target.classList);

    if (classList.includes(styles.color__selector)) {
      props.onAddMarking(event.target.dataset.marking);
    } else {
      switch (event.target.innerHTML) {
        case "&gt;":
          props.onSelectLetter("next");
          break;
        case "&lt;":
          props.onSelectLetter("prev");
          break;
      }
    }
  };
  return (
    <div className={styles.container}>
      {props.showGenerateBtn ? (
        <GenerateWordsBtn onGenerateWords={props.onGenerateWords} />
      ) : (
        ""
      )}
      <div className={styles.selector__container} onClick={clickHandler}>
        <button className={`${styles.btn__previous} ${styles.btn__selection}`}>
          {"<"}
        </button>
        <div
          className={`${styles.color__selector} ${styles["color__selector--incorrect"]}`}
          data-marking="I"
        ></div>
        <div
          className={`${styles.color__selector} ${styles["color__selector--hidden"]}`}
          data-marking="H"
        ></div>
        <div
          className={`${styles.color__selector} ${styles["color__selector--correct"]}`}
          data-marking="C"
        ></div>
        <button className={`${styles.btn__next} ${styles.btn__selection}`}>
          {">"}
        </button>
      </div>
    </div>
  );
}

export default WordMarkingSelector;
