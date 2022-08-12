import styles from "./EndModal.module.css";
import ModalContainer from "./ModalContainer";

function EndModal(props) {
  const clickHandler = function (event) {
    const classList = Array.from(event.target.classList);
    if (
      !classList.some((cssClass) =>
        [styles.modal__yes, styles.modal__no].includes(cssClass)
      )
    )
      return;
    switch (classList[0]) {
      case styles.modal__yes:
        props.onModalClick(true);
        break;
      default:
        props.onModalClick(false);
    }
  };
  console.log(props);
  return (
    <ModalContainer
      onClick={clickHandler}
      title={props.title}
      description={props.description}
    >
      <div className={styles["modal__options--container"]}>
        <p className={styles["modal__options--header"]}>Reset?</p>
        <div className={styles["modal__options--btns"]}>
          <button className={styles.modal__yes}>Yes</button>
          <button className={styles.modal__no}>No</button>
        </div>
      </div>
    </ModalContainer>
  );
}

export default EndModal;
