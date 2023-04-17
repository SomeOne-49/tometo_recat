import { useState, createContext, useEffect } from "react";

const LogStateContext = createContext({
  logState: "logout",
  showContent: false,
  onUserLog: () => {},
  onAdminLog: () => {},
  onLog: () => {},
  onUserLogged: () => {},
  onAdminLogged: () => {},
  onLogout: () => {},
});

export const Log = (props) => {
  const [logState, setLogState] = useState("logout");
  const logAI = localStorage.getItem("logState") || logState;
  useEffect(() => {
    if (localStorage.logState) setLogState(localStorage.logState);
  }, []);

  const userLoginHandler = () => {
    setLogState("user");
    localStorage.logState = "user";
  };

  const adminLoginHandler = () => {
    setLogState("admin");
    localStorage.logState = "admin";
  };

  const logintHandler = () => {
    setLogState("login");
    localStorage.logState = "login";
  };

  const userLoggedInHandler = () => {
    setLogState("userLogged");
    localStorage.logState = "userLogged";
  };

  const adminLoggedInHandler = () => {
    setLogState("adminLogged");
    localStorage.logState = "adminLogged";
  };

  const logoutHandler = () => {
    setLogState("logout");
    localStorage.logState = "logout";
  };

  return (
    <LogStateContext.Provider
      value={{
        logState: logState,
        onUserLog: userLoginHandler,
        showContent:
          logState !== "login" && logState !== "user" && logState !== "admin",
        onAdminLog: adminLoginHandler,
        onLog: logintHandler,
        onUserLogged: userLoggedInHandler,
        onAdminLogged: adminLoggedInHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </LogStateContext.Provider>
  );
};

export default LogStateContext;
