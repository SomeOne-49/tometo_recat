import UserForm from "./UserForm";
import { useContext } from "react";
import AdminForm from "./AdminForm";
import styles from "./LogAs.module.css";
import LogStateContext from "../../../store/logStateContext";

const LogBox = () => {
  const { logState, onUserLog, onAdminLog, onLogout } =
    useContext(LogStateContext);
  return (
    <div className={styles.log__box}>
      {logState === "user" && <UserForm />}
      {logState === "admin" && <AdminForm />}
      {logState === 'login' && (
        <div className={styles.log__as}>
          <div className={styles.as__user} onClick={onUserLog}>
            <img src={process.env.PUBLIC_URL + "img/user.png"} alt="user" />
            <h4>User</h4>
          </div>
          <div className={styles.as__admin} onClick={onAdminLog}>
            <img src={process.env.PUBLIC_URL + "img/admin.png"} alt="admin" />
            <h4>Admin</h4>
          </div>
        </div>
      )}
      <div className={styles.log__as__guest}>
        <h5>OR</h5>
        <p>
          Continue As A <span onClick={onLogout}>Guest.</span>
        </p>
      </div>
    </div>
  );
};

export default LogBox;
