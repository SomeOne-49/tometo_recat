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
        checkForm:
          state.username.trim() === "admin" &&
          state.password.trim() === "admin" &&
          state.adminKey.trim() === "kd#32@lS",
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
  adminKey: "",
  checkForm: "",
};

const AdminForm = () => {
  const { onAdminLogged } = useContext(logStateContext);

  const [showTip, setShowTip] = useState(false);
  const [error, setError] = useState(false);

  const [inpVal, dispatchVal] = useReducer(userLoginReducer, init);

  const { adminKey, username, password, checkForm } = inpVal;

  const inputHandler = (e, fieldName) => {
    dispatchVal({ type: "field", value: e.target.value, field: fieldName });
    dispatchVal({ type: "checkForm" });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      username.trim() === "" ||
      adminKey.trim() === "" ||
      password.trim() === ""
    ) {
      setShowTip(true);
      setError("Don't leave any field empty!");
      return;
    }
    if (!checkForm) {
      setShowTip(true);
      setError("The username, adminkey or password is incorrect.");
      return;
    }
    onAdminLogged();
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.input__fields}>
        <input
          type="text"
          value={username}
          onInput={(e) => inputHandler(e, "username")}
          placeholder="UserName..."
        />
        <input
          type="text"
          value={adminKey}
          onInput={(e) => inputHandler(e, "adminKey")}
          placeholder="Admin Key..."
        />
        <input
          type="password"
          value={password}
          onInput={(e) => inputHandler(e, "password")}
          placeholder="Password..."
        />
      </div>
      {showTip && <p className={styles.error}>{error}</p>}
      <button className={styles.login} type="submit">
        Login
      </button>
      {showTip && <Tips adminTip={true} />}
    </form>
  );
};

export default AdminForm;
