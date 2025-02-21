import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// root define 
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* give the final router */}
    <App />
  </React.StrictMode>
);
