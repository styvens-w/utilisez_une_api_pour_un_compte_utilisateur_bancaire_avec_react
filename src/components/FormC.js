import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, userLogin } from "../redux/features/authActions";
import { useNavigate } from "react-router-dom";

function FormC({ type }) {
  /**
   * En utilisant "useSelector" et "useDispatch", On peut lire l'état d'un store Redux et
   * envoyer une action depuis n'importe quel composant, respectivement.
   */
  const dispatch = useDispatch();
  // "useSelector" est utilisé pour extraire les valeurs d'état "loading", "error", "success", et "userToken" de l'objet auth dans le store Redux.
  const { loading, error, success, userToken } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    // Rediriger l'utilisateur authentifié vers la page de profil
    if (userToken) navigate("/profile");
    // Rediriger l'utilisateur vers la page de connexion si l'inscription a réussi.
    if (success) navigate("/sign_in");
  }, [navigate, userToken, success]);

  const submitForm = (data) => {
    // Le state "type" est définie depuis le router pour savoir qu'elle type de formulaire nous voulons.
    // Pour le formulaire de connexion
    if (type === "signin") {
      // l'action userLogin est distribuée grace à useDispatch avec les données du formulaire comme argument.
      dispatch(userLogin(data));
    }

    // Pour le formulaire d'inscription
    else if (type === "signup") {
      // On transforme l'email en minuscules pour éviter les problèmes de sensibilité à la casse lors de la connexion.
      data.email = data.email.toLowerCase();

      // On transforme le prénom en minuscules pour que la première lettre soit une majuscule.
      data.firstName =
        data.firstName[0].toUpperCase() + data.firstName.slice(1);

      // Pareil pour le nom
      data.lastName = data.lastName[0].toUpperCase() + data.lastName.slice(1);

      // L'action registerUser est distribuée grace à useDispatch avec les données du formulaire comme argument.
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

      {/**
       * Les champs de saisie sur la page d'inscription/connexion sont connectés à "react-hook-form",
       * qui saisit proprement les valeurs d'entrée et les renvoie dans une fonction "handleSubmit".
       */}
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
