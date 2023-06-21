import { SIGN_IN, SIGN_IN_ERROR, SIGN_UP, SIGN_UP_ERROR } from "../types";
import Axios from "../../utils/services/caller.service";
import { createAction } from "@reduxjs/toolkit";

// Les actions
export const sign_in = (email, password) => async (dispatch) => {
  try {
    const res = await Axios.post("/user/login", { email, password });

    dispatch({
      type: SIGN_IN,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: SIGN_IN_ERROR,
      payload: e.response.data,
    });
  }
};

export const sign_up =
  (email, password, firstName, lastName) => async (dispatch) => {
    try {
      const res = await Axios.post("/user/signup", {
        email,
        password,
        firstName,
        lastName,
      });

      dispatch({
        type: SIGN_UP,
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: SIGN_UP_ERROR,
        payload: e.response.data,
      });
    }
  };

export const sign_out = createAction("SIGN_OUT");
