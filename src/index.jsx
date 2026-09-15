import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/styles.scss";
import App from "./App";
import { unregister } from "./serviceWorker";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Remove registrations from earlier deployments so they cannot serve stale content.
unregister();
