import {
  GET_USER,
  GET_USER_ERROR,
  UPDATE_USER,
  UPDATE_USER_ERROR,
} from "../types";
import Axios from "../../utils/services/caller.service";

export const get_user = () => async (dispatch) => {
  try {
    const res = await Axios.post("/user/profile");

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: GET_USER_ERROR,
      payload: e.response.data,
    });
  }
};
