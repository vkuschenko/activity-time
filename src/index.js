import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { activityTime } from "./stores/activity-time";

ReactDOM.render(
  <StrictMode>
    <App activityTime={activityTime} />
  </StrictMode>,
  document.getElementById("root")
);
