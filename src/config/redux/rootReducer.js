import * as actionTypes from './actionTypes';

const initialState = {
    userbasedata: {},
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.USER_LOGGED_DATA:
        return {
            ...state,
            userbasedata: action.data,
        }

    default:
        return state;
    }
}

export default rootReducer;