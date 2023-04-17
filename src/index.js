import ReactDOM from "react-dom/client";
import { Log } from "./store/logStateContext";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Log>
    <App />
  </Log>
);
