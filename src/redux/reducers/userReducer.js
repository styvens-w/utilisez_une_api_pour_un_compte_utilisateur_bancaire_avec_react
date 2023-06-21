import {produce} from "immer"


// Le state initial
const initialState = {
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    status: 0,
    message: null,
}



// Le reducer
export default function userReducer (state = initialState, action)  {
    const {type, payload} = action;

    return produce(state, (draft) => {
        switch (type) {
            case "GET_USER": {

                draft.id = payload.body.id;
                draft.email = payload.body.email;
                draft.firstName = payload.body.firstName;
                draft.lastName = payload.body.lastName;
                draft.status = payload.status;
                draft.message = payload.message;

                return;
            }

            case "GET_USER_ERROR" : {
                draft.status = payload.status;
                draft.message = payload.message;

                return;
            }

            case "UPDATE_USER" : {
                draft.status = payload.status;
                draft.message = payload.message;

                return;
            }

            case "UPDATE_USER_ERROR" : {
                draft.status = payload.status;
                draft.message = payload.message;

                return;
            }

            default : {
                return;
            }
        }
    });
};