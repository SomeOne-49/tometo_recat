import styles from "./Counter.module.css";

const Counter = (props) => {
  return (
    <button
      className={`${styles.count__box} ${styles[props.className]}`}
      onClick={props.onClick}
      type="button"
    >
      {props.children}
    </button>
  );
};

export default Counter;
