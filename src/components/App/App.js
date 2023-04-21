import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";

import Register from "../Register/Register.js";
import Login from "../Login/Login.js";

import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";

import Movies from "../Movies/Movies.js";

import PageNotFound from "../PageNotFound/PageNotFound.js";

export default function App() {
  function BasicPageLayout() {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<BasicPageLayout />}>
        <Route index element={<Main />} />
        <Route path="/movies" index element={<Movies />} />
      </Route>
      <Route path="/signup" element={<Register />} />
      <Route path="/signin" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
