import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, userLogin } from "../redux/features/auth/authActions";
import { useNavigate } from "react-router-dom";

function FormC({ type }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { loading, error, success, userToken } = useSelector(
    (state) => state.auth
  );

  // redirect authenticated user to profile screen
  useEffect(() => {
    // redirect authenticated user to profile screen
    if (userToken) navigate("/profile");
    // redirect user to login page if registration was successful
    if (success) navigate("/sign_in");
  }, [navigate, userToken, success]);

  const submitForm = (data) => {
    if (type === "signin") {
      dispatch(userLogin(data));
    } else if (type === "signup") {
      // transform email string to lowercase to avoid case sensitivity issues in login
      data.email = data.email.toLowerCase();

      dispatch(registerUser(data));
    }
  };

  return (
    <section className="reg">
      <FontAwesomeIcon className="reg__icon" icon={faCircleUser} />
      {type === "signin" ? (
        <h1 className="reg__title">Sign In</h1>
      ) : (
        <h1 className="reg__title">Sign Up</h1>
      )}
      <form onSubmit={handleSubmit(submitForm)} className="reg__form">
        {error && (
          <div className="reg__form__error">
            <span>{error}</span>
          </div>
        )}

        <div className="reg__form__input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            autoComplete="email"
            id="email"
            {...register("email")}
            required
          />
        </div>
        <div className="reg__form__input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password")}
            required
          />
        </div>
        {type === "signin" ? (
          <React.Fragment>
            <div className="reg__form__input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            <button type="submit" className="reg__form__button">
              Sign In
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="reg__form__input-wrapper">
              <label htmlFor="firstname">FirstName</label>
              <input
                type="text"
                id="firstname"
                {...register("firstName")}
                required
              />
            </div>
            <div className="reg__form__input-wrapper">
              <label htmlFor="lastname">LastName</label>
              <input
                type="text"
                id="lastname"
                {...register("lastName")}
                required
              />
            </div>

            <button
              type="submit"
              className="reg__form__button"
              disabled={loading}
            >
              Sign Up
            </button>
          </React.Fragment>
        )}
      </form>

      {type === "signin" ? (
        <a className="reg__link" href="/sign_up">
          Sign-Up
        </a>
      ) : (
        <a className="reg__link" href="/sign_in">
          Sign-In
        </a>
      )}
    </section>
  );
}

export default FormC;
