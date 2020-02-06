import {
    API_CALL_FETCHING,
    API_CALL_SUCCESS,
    API_CALL_FAILURE
} from "../actions";

const initialState = {
    pokemon: [],
    error: "",
    isFetching: false
};

export const pokemonReducer = (state = initialState, action) => {
    switch (action.type) {
        case API_CALL_FETCHING:
            return {
                ...state,
                isFetching: true
            };
        case API_CALL_SUCCESS:
            return {
                ...state,
                pokemon: action.payload,
                error: "",
                isFetching: false
            };
        case API_CALL_FAILURE:
            return {
                ...state,
                error: action.payload,
                isFetching: false
            };
        default:
            return state;
    }
};
