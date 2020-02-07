import axios from "axios";

export const API_CALL_FETCHING = "API_CALL_FETCHING";
export const API_CALL_SUCCESS = "API_CALL_SUCCESS";
export const API_CALL_FAILURE = "API_CALL_FAILURE";
export const FETCHING_DEX_ENTRIES = "FETCHING_DEX_ENTRIES";
export const FETCHING_DEX_ENTRIES_SUCCESS = "FETCHING_DEX_ENTRIES_SUCCESS";
export const FETCHING_DEX_ENTRIES_FAILURE = "FETCHING_DEX_ENTRIES_FAILURE";

export const getPokemon = apiUrl => dispatch => {
    dispatch({ type: API_CALL_FETCHING });
    axios
        .get(apiUrl)
        .then(res => {
            console.log("res: ", res.data);

            dispatch({ type: API_CALL_SUCCESS, payload: res.data });
            return res.data.species.url;
        })
        .then(res => {
            console.log("res: ", res);

            axios
                .get(res)
                .then(res => {
                    console.log(
                        "species res: ",
                        res.data["flavor_text_entries"]
                    );
                    dispatch({
                        type: FETCHING_DEX_ENTRIES_SUCCESS,
                        payload: res.data["flavor_text_entries"]
                    });
                })
                .catch(err => {
                    console.log("species err: ", err);
                });
        })
        .catch(err => {
            // console.log("err: ", err);
            // console.log("err: apiUrl: ", apiUrl);
            dispatch({ type: API_CALL_FAILURE, payload: err });
        });
};

export const getDexEntries = apiUrl => dispatch => {
    dispatch({ type: FETCHING_DEX_ENTRIES });
    axios
        .get(apiUrl)
        .then(res => {
            console.log("res: ", res);
        })
        .catch(err => {
            console.log("err: ", err);
        });
};
