import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import OrionLinguaDebug from "./pages/OrionLinguaDebug";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/orion" element={<OrionLinguaDebug />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
