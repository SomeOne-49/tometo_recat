import { useState } from "react";
import styles from "./CartItem.module.css";
import NumberBox from "../../UI/NumberBox";

const CartItem = (props) => {
  const [amount, setAmount] = useState(props.amount);

  const incrementHandler = () => {
    props.onCounter(props.id, 'inc');
    setAmount((prevVal) => ++prevVal);
  };

  const decrementHandler = () => {
    props.onCounter(props.id, 'dec');
    if (amount <= 1) {
      props.onRemover(props.id);
      return;
    }
    setAmount((prevVal) => --prevVal);
  };

  return (
    <li key={props.id} className={styles.cart__item}>
      <div>
        <h4>{props.title}</h4>
        <div className={styles.item__info}>
          <h3>${props.price}</h3>
          <NumberBox>× {amount}</NumberBox>
        </div>
      </div>
      <div className={styles.counter}>
        <button
          className={`${styles.count__box} ${styles.inc}`}
          onClick={incrementHandler}
        >
          +
        </button>
        <button
          className={`${styles.count__box} ${styles.dec}`}
          onClick={decrementHandler}
        >
          -
        </button>
      </div>
    </li>
  );
};

export default CartItem;
