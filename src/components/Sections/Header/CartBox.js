import CartItem from "./CartItem";
import styles from "./CartBox.module.css";

const CartBox = (props) => {
  const total = props.cartArr.reduce((acc, curr) => {
    console.log(acc, curr);
    return acc + +curr.price * +curr.amount;
  }, 0);

  return (
    <div className={styles.cart__box}>
      <ul>
        {props.cartArr.length > 0 ? (
          props.cartArr.map((el) => {
            return (
              <CartItem
                key={el.id}
                id={el.id}
                title={el.title}
                price={el.price}
                amount={el.amount}
                onCounter={props.onCounter}
                onRemover={props.onRemover}
              />
            );
          })
        ) : (
          <h2 className={styles.no__product}>
            There Is No Product In Cart Yet.
          </h2>
        )}
      </ul>
      <div className={styles.total}>
        <h3>Price Total:</h3>
        <h2>${total.toFixed(2)}</h2>
      </div>
      <div className={styles.order__actions}>
        <button className={styles.cansel} onClick={props.onClick}>
          Cansel
        </button>
        <button className={styles.confirm}>Order</button>
      </div>
    </div>
  );
};

export default CartBox;
