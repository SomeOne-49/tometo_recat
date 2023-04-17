import LogForm from "./UserForm";
import styles from "./LogBox.module.css";

const LogBox = () => {
  return (
    <div className={styles.log__box}>
      <LogForm />
    </div>
  );
};

export default LogBox;
