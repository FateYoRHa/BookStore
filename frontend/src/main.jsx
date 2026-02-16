import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App.jsx";

// DO NOT TOUCH/ADD ANYTHING HERE
// Put additions to ./app/providers
// Entry point of the entire React app.
// This file should ONLY boot the application.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
