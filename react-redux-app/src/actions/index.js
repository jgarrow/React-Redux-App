import axios from "axios";

export const API_CALL_FETCHING = "API_CALL_FETCHING";
export const API_CALL_SUCCESS = "API_CALL_SUCCESS";
export const API_CALL_FAILURE = "API_CALL_FAILURE";

export const getPokemon = apiUrl => dispatch => {
    dispatch({ type: API_CALL_FETCHING });
    axios
        .get(apiUrl)
        .then(res => {
            console.log("res: ", res.data);

            dispatch({ type: API_CALL_SUCCESS, payload: res.data });
        })
        .catch(err => {
            console.log("err: ", err);
            console.log("err: apiUrl: ", apiUrl);
            dispatch({ type: API_CALL_FAILURE, payload: err });
        });
};
