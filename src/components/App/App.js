import React from "react";
import { Route, Routes } from "react-router-dom";

import Register from "../Register/Register.js";
import Login from "../Login/Login.js";

import Main from "../Main/Main.js";

import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile.js";

import PageNotFound from "../PageNotFound/PageNotFound.js";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />

      <Route path="/movies" element={<Movies />} />
      <Route path="/saved-movies" element={<SavedMovies />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="/signup" element={<Register />} />
      <Route path="/signin" element={<Login />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
