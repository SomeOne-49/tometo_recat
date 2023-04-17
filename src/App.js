import { useState, useContext, useEffect } from "react";
import Header from "./components/Sections/Header/Header";
import LogAs from "./components/Sections/Log/LogAs";
import Main from "./components/Sections/Main/Main";
import LogStateContext from "./store/logStateContext";

import FoodList from "./components/Sections/FoodList/FoodList";
import AddFood from "./components/Sections/AddFood/AddFood";

function App() {
  const { logState, showContent } = useContext(LogStateContext);
  const [foodArr, setFoodArr] = useState([
    {
      id: 1,
      title: "sushi",
      des: "Finest fish and veggies",
      price: "22.99",
    },
    {
      id: 2,
      title: "Schnitzel",
      des: "Agerman Specialty!",
      price: "16.50",
    },
    {
      id: 3,
      title: "Barbecue Burger",
      des: "Americanm raw meaty",
      price: "12.99",
    },
    {
      id: 4,
      title: "Green Bowl",
      des: "Healthy...and green...",
      price: "18.99",
    },
  ]);
  useEffect(() => {
    if (localStorage.foodArr) setFoodArr(JSON.parse(localStorage.foodArr));
  }, []);
  const addFoodHandler = (item) => {
    setFoodArr((prevImtes) => {
      localStorage.foodArr = JSON.stringify([...prevImtes, item]);
      return [...prevImtes, item];
    });
  };

  const [cartArr, setCartArr] = useState([]);

  useEffect(() => {
    if (localStorage.cartArr) setCartArr(JSON.parse(localStorage.cartArr));
  }, []);
  const cartAddHandler = (item) => {
    for (let el of cartArr) {
      if (el.id === item.id) {
        counterHandler(item.id, "add", item.amount);
        return;
      }
    }

    setCartArr((prevImtes) => {
      localStorage.cartArr = JSON.stringify([...prevImtes, item]);
      return [...prevImtes, item];
    });
  };

  const counterHandler = (id, modifier, amount) => {
    const updateAmount = cartArr.map((ele) => {
      if (ele.id === id) {
        ele.amount =
          modifier === "add"
            ? +ele.amount + +amount
            : modifier === "inc"
            ? ++ele.amount
            : --ele.amount;
      }
      return ele;
    });
    setCartArr(updateAmount);
    localStorage.cartArr = JSON.stringify([...cartArr]);
  };

  const cartRemoveHandler = (itemId) => {
    setCartArr((pervItems) => {
      const newCartArr = pervItems.filter((el) => el.id !== itemId);
      localStorage.cartArr = JSON.stringify([
        ...pervItems.filter((el) => el.id !== itemId),
      ]);
      return newCartArr;
    });
  };

  return (
    <>
      <Header
        cartArr={cartArr}
        onCounter={counterHandler}
        onRemover={cartRemoveHandler}
      />
      {(logState === "login" ||
        logState === "user" ||
        logState === "admin") && <LogAs />}
      {showContent && <Main />}
      {logState === "adminLogged" && <AddFood onAddFood={addFoodHandler} />}
      {showContent && <FoodList foodArr={foodArr} addToCart={cartAddHandler} />}
    </>
  );
}

export default App;
