import { produce } from "immer";

// Le state initial
const initialState = {
  status: 0,
  message: null,
};

// Le reducer
export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  return produce(state, (draft) => {
    switch (type) {
      case "SIGN_IN": {
        localStorage.setItem("token", payload.body.token);
        draft.status = payload.status;
        draft.message = payload.message;

        return;
      }

      case "SIGN_IN_ERROR": {
        draft.status = payload.status;
        draft.message = payload.message;

        return;
      }

      case "SIGN_UP": {
        draft.status = payload.status;
        draft.message = payload.message;

        return;
      }

      case "SIGN_UP_ERROR": {
        draft.status = payload.status;
        draft.message = payload.message;

        return;
      }

      case "SIGN_OUT": {
        localStorage.removeItem("token");

        return initialState;
      }

      default: {
        return state;
      }
    }
  });
}
