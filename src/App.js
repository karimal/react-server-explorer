import React, { StrictMode } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/molecules/Header";
import List from "./components/organisms/List";
import Login from "./components/organisms/Login";
import "./assets/styles/main.css";

render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<List />} />
        <Route path="/login" exact element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root")
);
