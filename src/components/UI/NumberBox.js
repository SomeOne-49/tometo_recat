import styles from "./NumberBox.module.css";

const NumberBox = (props) => {
  return  <span className={styles.amount}>{props.children}</span>;
};

export default NumberBox;
