import styles from "./FormStyles.module.css";
const Tips = (props) => {
  return (
    <div className={styles.tips}>
      <h4>Tips:</h4>
      <div>
        <p>
          usernam: <span>{props.adminTip ? "admin" : "user"} </span>
        </p>
        <p>
          password: <span> {props.adminTip ? "admin" : "user"} </span>
        </p>
        {props.adminTip && (
          <p>
            adminkey: <span> kd#32@lS</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Tips;
