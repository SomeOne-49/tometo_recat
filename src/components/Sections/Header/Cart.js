import styles from "./Cart.module.css";
const Card = (props) => {
  return (
    <div className={styles.card} onClick={props.onClick}>
      <img src={process.env.PUBLIC_URL + '/img/cart.png'} alt="cart" />
      <h4>Your Cart</h4>
      <p className={styles.order__number}>{props.CartItems}</p>
    </div>
  );
};
export default Card;
