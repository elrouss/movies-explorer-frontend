import React from "react";
import { Route, Routes } from "react-router-dom";

import Register from "../Register/Register.js";
import Login from "../Login/Login.js";

import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";

import PageNotFound from "../PageNotFound/PageNotFound.js";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
            <Main />
            <Footer />
          </>
        }
      ></Route>
      <Route path="/signup" element={<Register />} />
      <Route path="/signin" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
