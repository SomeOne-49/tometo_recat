import ReactDOM from "react-dom";
import { useState, useContext } from "react";

import Cart from "./Cart";
import Overlay from "../../UI/Overlay";
import CartBox from "./CartBox";
import LogStateContext from "../../../store/logStateContext";

import styles from "./Header.module.css";

const Header = (props) => {
  const { logState, onLog, onLogout } = useContext(LogStateContext);

  const [appearCart, setAppearCart] = useState(false);

  const cartClickHandler = () => {
    setAppearCart(!appearCart);
  };

  const CartItems = props.cartArr.length;

  return (
    <header>
      <h2>
        <a href="# " className={styles.logo}>
          TOMETO
        </a>
      </h2>
      {logState === "userLogged" && <Cart CartItems={CartItems} onClick={cartClickHandler} />}
      {logState === "logout" && (
        <div className={styles.log} onClick={onLog}>
          <img src={process.env.PUBLIC_URL + "img/login.png"} alt="Login" />
          <span>Login</span>
        </div>
      )}
      {(logState === "userLogged" || logState === "adminLogged") && (
        <div className={`${styles.log} ${styles.logout}`} onClick={onLogout}>
          <img src={process.env.PUBLIC_URL + "img/logout.png"} alt="Logout" />
          <span>Logout</span>
        </div>
      )}

      {appearCart &&
        ReactDOM.createPortal(
          <Overlay onClick={cartClickHandler} />,
          document.getElementById("overlay-root")
        )}
      {appearCart &&
        ReactDOM.createPortal(
          <CartBox onClick={cartClickHandler} cartArr={props.cartArr} onCounter={props.onCounter} onRemover={props.onRemover} />,
          document.getElementById("popup-root")
        )}
    </header>
  );
};

export default Header;
