import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from 'react-redux';
import { sign_in, sign_up } from "../redux/actions/authActions"
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {get_user} from "../redux/actions/userActions";


function FormC({ type }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const connected = !!localStorage.getItem("token");
    const status = useSelector(state => state.auth.status);
    const message = useSelector(state => state.auth.message);


    useEffect(() => {
        if (connected) {
            navigate("/profile");
        }

        if (status === 200 && message === "User successfully created") {
            navigate("/sign_in");
            document.getElementById("password").value = "";
        }
    }, [connected, navigate, status, message])


    return (
        <section className="reg">
            <FontAwesomeIcon className="reg__icon" icon={faCircleUser} />
            {
                type === "signin"
                    ? (<h1 className="reg__title">Sign In</h1>)
                    : (<h1 className="reg__title">Sign Up</h1>)
            }
            <form className="reg__form">
                {
                    message ? (<div className="reg__form__error"><span>{message}</span></div>) : ("")
                }

                <div className="reg__form__input-wrapper">
                    <label htmlFor="email">Email</label>
                    <input type="text" autoComplete="email" id="email" name="email"/>
                </div>
                <div className="reg__form__input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password"/>
                </div>

                {
                    type === "signin"
                        ?
                        (
                            <React.Fragment>
                                <div className="reg__form__input-remember">
                                    <input type="checkbox" id="remember-me"/>
                                    <label htmlFor="remember-me">Remember me</label>
                                </div>

                                <button onClick={(e) => {

                                    const email = document.getElementById("email").value;
                                    const password = document.getElementById("password").value;

                                    dispatch(sign_in(email, password));
                                    e.preventDefault();

                                }} type="submit" className="reg__form__button">Sign In</button>
                            </React.Fragment>

                        )
                        :
                        (
                            <React.Fragment>
                                <div className="reg__form__input-wrapper">
                                    <label htmlFor="firstname">FirstName</label>
                                    <input type="text" id="firstname" name="firstname"/>
                                </div>
                                <div className="reg__form__input-wrapper">
                                    <label htmlFor="lastname">LastName</label>
                                    <input type="text" id="lastname" name="lastname"/>
                                </div>

                                <button onClick={(e) => {

                                    const email = document.getElementById("email").value;
                                    const password = document.getElementById("password").value;
                                    const firstName = document.getElementById("firstname").value;
                                    const lastName = document.getElementById("lastname").value;

                                    dispatch(sign_up(email, password, firstName.charAt(0).toUpperCase() + firstName.slice(1), lastName.charAt(0).toUpperCase() + lastName.slice(1)));
                                    e.preventDefault();

                                }} type="submit" className="reg__form__button">Sign Up</button>
                            </React.Fragment>
                        )
                }

            </form>

            {
                type === "signin"
                    ? (<a className="reg__link" href="/sign_up">Sign-Up</a>)
                    : (<a className="reg__link" href="/sign_in">Sign-In</a>)
            }

        </section>
    )
}

export default FormC