import React from "react";
import ReactDOM from "react-dom";
import "./styles/styles.scss";
import App from "./App";
import { unregister } from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// Remove registrations from earlier deployments so they cannot serve stale content.
unregister();
