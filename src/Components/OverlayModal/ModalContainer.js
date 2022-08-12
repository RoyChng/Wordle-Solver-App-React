import styles from "./ModalContainer.module.css";

const ModalContainer = function (props) {
  return (
    <div className={styles.modal__container} onClick={props.onClick}>
      <div className={styles["modal__heading--container"]}>
        <h3 className={styles.modal__header}>{props.title}</h3>
        <p className={styles.modal__description}>{props.description}</p>
        <hr className={styles.modal__divider}></hr>
      </div>
      {props.children}
    </div>
  );
};

export default ModalContainer;
