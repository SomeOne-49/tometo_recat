import { useContext } from "react";
import LogStateContext from "../../../store/logStateContext";
import styles from "./Main.module.css";
import FloatBox from "./FloatBox";
const Main = () => {
  const { logState } = useContext(LogStateContext);
  return (
    <main className={`${styles.main} ${logState !== 'logout' ? styles.not__guest : "" }`}>
      <img src={process.env.PUBLIC_URL + "/img/food.jpg"} alt="food" />
      {logState === 'logout' && <FloatBox />}
    </main>
  );
};
export default Main;
