import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import useFormWithValidation from "../../hooks/useFormWithValidation";

import { EMAIL_PATTERN, USERNAME_PATTERN } from "../../utils/constants";
import { VALIDATION_MESSAGES } from "../../utils/validation";

function Profile({ setIsCurrentUserLoggedIn, onUpdate, onLoad, error }) {
  const navigate = useNavigate();

  const currentUser = useContext(CurrentUserContext);
  const { email, name } = currentUser;

  const { values, setValues, errors, isValid, handleChange } =
    useFormWithValidation();

  useEffect(() => {
    setValues({ email, name });
  }, [navigate]);

  function handleSubmit(evt) {
    evt.preventDefault();

    const { email, name } = values;

    onUpdate({
      email: email.trim().replace(/\s/g, ""),
      name: name.trim().replace(/\s+/g, " "),
    });
  }

  function loginOut() {
    localStorage.removeItem("jwt");
    navigate("/", { replace: true });
    setIsCurrentUserLoggedIn(false);
  }

  return (
    <div className="profile">
      <div className="profile__wrapper">
        <h1 className="profile__heading">Привет, {name}!</h1>
        <form
          className="profile__form"
          name="profile"
          onSubmit={handleSubmit}
          noValidate
        >
          <fieldset className="profile__fieldset">
            <div className="profile__input-wrapper">
              <label className="profile__label" htmlFor="name">
                Имя
              </label>
              <input
                className="profile__input"
                id="name"
                name="name"
                type="text"
                autoComplete="on"
                value={values?.name || ""}
                required
                onChange={handleChange}
                pattern={USERNAME_PATTERN}
              />
            </div>

            <div className="profile__input-wrapper">
              <label className="profile__label" htmlFor="email">
                E-mail
              </label>
              <input
                className="profile__input"
                id="email"
                name="email"
                type="text"
                autoComplete="on"
                value={values?.email || ""}
                required
                onChange={handleChange}
                pattern={EMAIL_PATTERN}
              />
              <span
                className={`error${
                  ((errors?.email || errors?.name) && " error_visible") || ""
                } error__server`}
              >
                {errors?.name && VALIDATION_MESSAGES.frontend.name + "\n"}
                {errors?.email && VALIDATION_MESSAGES.frontend.email}
              </span>
            </div>
          </fieldset>
          <div className="profile__wrapper-btn">
            <span
              className={`error${
                (error?.updatingUserInfoResponse && " error_visible") || ""
              } error__server`}
            >
              {error?.updatingUserInfoResponse}
            </span>
            <button
              className="btn btn-profile"
              type="submit"
              aria-label="Редактирование данных профиля"
              disabled={!isValid || onLoad}
            >
              {onLoad ? "Сохранение..." : "Редактировать"}
            </button>
          </div>
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
  onUpdate: PropTypes.func,
  onLoad: PropTypes.bool,
  error: PropTypes.object,
};

export default Profile;
