import FoodItem from "./FoodItem";
import styles from "./FoodList.module.css";
import LogStateContext from "../../../store/logStateContext";

const FoodList = (props) => {
  return (
    <div className={styles.food__list}>
      <ul>
        {props.foodArr.map((el) => {
          return (
            <FoodItem
              key={el.id}
              id={el.id}
              title={el.title}
              des={el.des}
              price={el.price}
              onAdd={props.addToCart}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default FoodList;
