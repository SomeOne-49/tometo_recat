import { useState, useReducer, useContext } from "react";
import logStateContext from "../../../store/logStateContext";
import Tips from "./Tips";
import styles from "./FormStyles.module.css";

const userLoginReducer = (state, action) => {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.field]: action.value,
      };
    }

    case "checkForm": {
      return {
        ...state,
        checkForm: state.username === "user" && state.password === "user",
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

const init = {
  username: "",
  password: "",
  checkForm: false,
};

const UserForm = () => {
  const { onUserLogged } = useContext(logStateContext);

  const [showTip, setShowTip] = useState(false);
  const [error, setError] = useState(false);

  const [inpVal, dispatchVal] = useReducer(userLoginReducer, init);

  const { username, password, checkForm } = inpVal;

  const inputHandler = (e, fieldName) => {
    dispatchVal({ type: "field", value: e.target.value, field: fieldName });
    dispatchVal({ type: "checkForm" });
  };

  const blurHandler = (type) => {
    dispatchVal({ type: type });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      username.trim() === "" ||
      password.trim() === ""
    ) {
      setShowTip(true);
      setError("Don't leave any field empty!");
      return;
    }
    if (!checkForm) {
      setShowTip(true);
      setError("The username or password is incorrect.");
      return;
    }
    onUserLogged();
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.input__fields}>
        <input
          type="text"
          value={username}
          placeholder="Username..."
          onInput={(e) => inputHandler(e, "username")}
          onBlur={() => blurHandler("checkName")}
        />
        <input
          type="password"
          value={password}
          placeholder="Password..."
          onInput={(e) => inputHandler(e, "password")}
          onBlur={() => blurHandler("checkPassword")}
        />
      </div>
      {showTip && (
        <p className={styles.error}>{error}</p>
      )}
      <button className={styles.login} type="submit">
        Login
      </button>{" "}
      {showTip && <Tips />}
    </form>
  );
};

export default UserForm;
