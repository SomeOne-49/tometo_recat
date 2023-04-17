import ReactDOM from "react-dom";
import { useState, useRef, useEffect, useContext, useReducer } from "react";
import styles from "./FoodItem.module.css";
import LogStateContext from "../../../store/logStateContext";
import Overlay from "../../UI/Overlay";
import LogAlert from "./LogAlert";

const FoodIem = (props) => {
  const { logState } = useContext(LogStateContext);

  const [alert, dispetchAlert] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SHOW_ALERT": {
          return {
            ...state,
            showAlert: true,
          };
        }
        case "HIDE_ALERT": {
          return {
            ...state,
            showAlert: false,
          };
        }
        case "done": {
          return {
            ...state,
            alertTxt: "Added!",
            style: "done",
          };
        }
        case "fail": {
          return {
            ...state,
            alertTxt: "Select at least one order!",
            style: "fail",
          };
        }
        default: {
          return { ...state };
        }
      }
    },
    { showAlert: "", alertTxt: "", style: "" }
  );

  const { showAlert, alertTxt, style } = alert;

  const [amountVal, setamountVal] = useState(0);
  const amount = useRef();

  const amountHandler = (e) => {
    setamountVal(e.target.value);
    if (e.target.value > 0) {
      dispetchAlert({ type: "HIDE_ALERT" });
    }
  };

  const AddHandler = () => {
    dispetchAlert({ type: "SHOW_ALERT" });
    if (logState === "logout") {
      return;
    }
    if (amount.current.value < 1) {
      dispetchAlert({ type: "fail" });
      return;
    }
    dispetchAlert({ type: "done" });
    props.onAdd({
      id: props.id,
      title: props.title,
      price: props.price,
      amount: amount.current.value,
    });
  };

  useEffect(() => {
    const clearAlert = setTimeout(() => {
      dispetchAlert({ type: "HIDE_ALERT" });
    }, 4500);
    return () => clearTimeout(clearAlert);
  }, [showAlert]);

  return (
    <>
      <li key={props.id} className={styles.product__card}>
        <div className={logState === "adminLogged" ? styles.admin__style : ""}>
          <div>
            <h4>{props.title}</h4>
            <p> {props.des} </p>
          </div>
          <h3>${props.price}</h3>
        </div>
        {logState !== "adminLogged" && (
          <div className={styles.order}>
            <div className={styles.amount__box}>
              <span>Amoutn:</span>
              <input
                ref={amount}
                className={styles.amount}
                type="number"
                min="0"
                placeholder="0"
                value={amountVal}
                onChange={amountHandler}
                max="100"
              />
            </div>
            {showAlert && (
              <p className={`${styles.alert} ${styles[style]}`}>{alertTxt}</p>
            )}
            <button onClick={AddHandler}>+ Add</button>
          </div>
        )}
      </li>
      {showAlert &&
        logState === "logout" &&
        ReactDOM.createPortal(
          <Overlay
            onClick={() => {
              dispetchAlert({ type: "HIDE_ALERT" });
            }}
          />,
          document.getElementById("overlay-root")
        )}
      {showAlert && logState === "logout" && (
        <LogAlert onClick={() => dispetchAlert({ type: "HIDE_ALERT" })} />
      )}
    </>
  );
};

export default FoodIem;
