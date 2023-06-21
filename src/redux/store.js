import thunk from "redux-thunk";

import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },

  middleware: [thunk],
});

//const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
