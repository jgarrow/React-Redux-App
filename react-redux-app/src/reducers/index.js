import {
    API_CALL_FETCHING,
    API_CALL_SUCCESS,
    API_CALL_FAILURE
} from "../actions";

const initialState = {
    pokemon: [],
    next: null,
    previous: null,
    error: "",
    isFetching: false
};

export const pokemonReducer = (state = initialState, action) => {
    switch (action.type) {
        case API_CALL_FETCHING:
            return {
                ...state,
                error: "",
                isFetching: true,
                next: null,
                previous: null
            };
        case API_CALL_SUCCESS:
            return {
                ...state,
                pokemon: action.payload.results,
                error: "",
                isFetching: false,
                next: action.payload.next,
                previous: action.payload.previous
            };
        case API_CALL_FAILURE:
            return {
                ...state,
                error: action.payload,
                isFetching: false,
                next: null,
                previous: null
            };
        default:
            return state;
    }
};
