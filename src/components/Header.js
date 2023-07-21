import "../assets/scss/layouts/_header.scss";
import React, { useEffect } from "react";
import logo from "../assets/img/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "../utils/services/auth.service";
import { logout, setCredentials } from "../redux/features/authSlice";
import {
  faArrowRightFromBracket,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  const { userInfo, loginSuccess } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // On authentifie automatiquement l'utilisateur si le token est trouvé
  const { data } = useGetUserDetailsQuery("userDetails", {
    // On effectue une nouvelle récupération toutes les 15 minutes
    pollingInterval: 900000,
  });

  useEffect(() => {
    // Si une connexion est établi, on recharge la page.
    if (loginSuccess) {
      window.location.reload();
    }

    // si les données de l'utilisateur son trouvé
    if (data) {
      dispatch(setCredentials(data));
    }
  }, [data, dispatch, loginSuccess]);

  return (
    <header className="header">
      <nav className="header__nav">
        <a className="header__nav__logo" href="/">
          <img
            className="header__nav__logo__image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          {userInfo ? (
            <React.Fragment>
              <a className="header__nav__item" href="/profile">
                <FontAwesomeIcon
                  className="header__nav__item-icon"
                  icon={faCircleUser}
                />
                {userInfo && userInfo?.body.firstName}
              </a>

              <a
                onClick={() => dispatch(logout())}
                className="header__nav__item"
                href="/sign_in"
              >
                <FontAwesomeIcon
                  className="header__nav__item-icon"
                  icon={faArrowRightFromBracket}
                />
                Sign-Out
              </a>
            </React.Fragment>
          ) : (
            <a className="header__nav__item" href="/sign_in">
              <FontAwesomeIcon
                className="header__nav__item-icon"
                icon={faCircleUser}
              />
              Sign-In / Sign-Up
            </a>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
