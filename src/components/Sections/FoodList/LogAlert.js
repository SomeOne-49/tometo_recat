import { useContext } from "react";
import styles from "./LogAlert.module.css";
import LogStateContext from "../../../store/logStateContext";
const LogAlert = (props) => {
  const { onLog} = useContext(LogStateContext)
  return (
    <div className={styles.alert}>
      <h2>Alert</h2>
      <p>You must be logged in to be able to add.</p>
      <div className={styles.btns}>
        <button onClick={onLog} className={styles.login}>Login Now</button>
        <button onClick={props.onClick} className={styles.guest}>Continue As A Guest</button>
      </div>
    </div>
  );
};
export default LogAlert;
