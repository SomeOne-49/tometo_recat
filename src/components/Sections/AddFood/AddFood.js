import { useReducer } from "react";
import styles from "./AddFood.module.css";

const AddFood = (props) => {
  const [form, dispetchForm] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "field": {
          return {
            ...state,
            [action.field]: action.value,
          };
        }
        case "error": {
          return {
            ...state,
            error:
              state.title.trim().trim() === "" ||
              state.des.trim() === "" ||
              state.price === "",
          };
        }
        case "showAlert": {
          return {
            ...state,
            showAlert: action.boolean,
          };
        }
        case "foodObj": {
          return {
            ...state,
            foodObj: {
              id: Date.now(),
              title: state.title,
              des: state.des,
              price: state.price,
            },
          };
        }
        default: {
          return {
            foodObj: {},
            showAlert: false,
            error: true,
            title: "",
            des: "",
            price: "",
          };
        }
      }
    },
    {
      foodObj: {},
      showAlert: false,
      error: true,
      title: "",
      des: "",
      price: "",
    }
  );
  const { foodObj, showAlert, error, title, des, price } = form;

  const inputHandler = (e, fieldName) => {
    dispetchForm({ type: "field", value: e.target.value, field: fieldName });
    dispetchForm({ type: "foodObj" });
    dispetchForm({ type: "error" });
  };

  const submitHandler = (e) => {
    e.preventDefault()
    if (error) {
      dispetchForm({ type: "showAlert", boolean: true });
      return;
    }
    props.onAddFood(foodObj);
    dispetchForm({ type: 'init' });
  };
  
  return (
    <>
      <div className={styles.add__food}>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Food Name..."
            value={title}
            onInput={(e) => inputHandler(e, "title")}
          />
          <input
            type="text"
            placeholder="Food Description..."
            value={des}
            onInput={(e) => inputHandler(e, "des")}
          />
          <input
            type="number"
            placeholder="Food Price..."
            value={price}
            onInput={(e) => inputHandler(e, "price")}
          />
          <button type="submit">Add</button>
        </form>
        {showAlert && <h4>Don't leave any field blank!</h4>}
      </div>
    </>
  );
};

export default AddFood;
