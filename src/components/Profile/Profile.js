import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ setIsCurrentUserLoggedIn }) {
  const navigate = useNavigate();
  const currentUser = useContext(CurrentUserContext);
  const { email, name } = currentUser;

  function loginOut() {
    localStorage.removeItem("jwt");
    navigate("/", { replace: true });
    setIsCurrentUserLoggedIn(false);
  }

  return (
    <div className="profile">
      <div className="profile__wrapper">
        <h1 className="profile__heading">Привет, {name}!</h1>
        <form className="profile__form" name="profile">
          <fieldset className="profile__fieldset">
            <div className="profile__input-wrapper">
              <label className="profile__label" htmlFor="name">
                Имя
              </label>
              <input
                className="profile__input"
                id="name"
                type="text"
                minLength="2"
                maxLength="30"
                autoComplete="on"
                defaultValue={name}
                required
              />
            </div>
            <div className="profile__input-wrapper">
              <label className="profile__label" htmlFor="email">
                E-mail
              </label>
              <input
                className="profile__input"
                id="email"
                type="email"
                autoComplete="on"
                defaultValue={email}
                required
              />
            </div>
          </fieldset>
          <button
            className="btn btn-profile"
            type="submit"
            aria-label="Редактирование данных профиля"
          >
            Редактировать
          </button>
        </form>
        <button
          className="btn btn-profile-exit"
          type="button"
          aria-label="Выход из личного кабинета пользователя"
          onClick={() => loginOut()}
        >
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}

Profile.propTypes = {
  setIsCurrentUserLoggedIn: PropTypes.func,
};

export default Profile;
