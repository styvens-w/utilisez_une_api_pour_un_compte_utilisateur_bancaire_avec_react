import "../assets/scss/layouts/_header.scss";
import React, { useEffect } from "react";
import logo from "../assets/img/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { sign_out } from "../redux/actions/authActions";
import { get_user } from "../redux/actions/userActions";

function Header() {
  let connected = !!localStorage.getItem("token");
  const dispatch = useDispatch();
  const firstName = useSelector((state) => state.user.firstName);

  useEffect(() => {
    if (connected) {
      dispatch(get_user());
    }
  }, [connected, dispatch]);

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
          {connected ? (
            <React.Fragment>
              <a className="header__nav__item" href="/profile">
                <FontAwesomeIcon
                  className="header__nav__item-icon"
                  icon={faCircleUser}
                />
                {firstName}
              </a>

              <a
                onClick={() => dispatch(sign_out())}
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
