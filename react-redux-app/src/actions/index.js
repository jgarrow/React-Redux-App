import axios from "axios";

export const API_CALL_FETCHING = "API_CALL_FETCHING";
export const API_CALL_SUCCESS = "API_CALL_SUCCESS";
export const API_CALL_FAILURE = "API_CALL_FAILURE";
export const FETCHING_DEX_ENTRIES = "FETCHING_DEX_ENTRIES";
export const FETCHING_DEX_ENTRIES_SUCCESS = "FETCHING_DEX_ENTRIES_SUCCESS";
export const FETCHING_DEX_ENTRIES_FAILURE = "FETCHING_DEX_ENTRIES_FAILURE";
export const FETCHING_MOVE_INFO = "FETCHING_MOVES";
export const FETCHING_MOVE_INFO_SUCCESS = "FETCHING_MOVES_SUCCESS";
export const FETCHING_MOVE_INFO_FAILURE = "FETCHING_MOVES_FAILURE";
export const FETCHING_STAT_INFO = "FETCHING_STAT_INFO";
export const FETCHING_STAT_INFO_SUCCESS = "FETCHING_STAT_INFO_SUCCESS";
export const FETCHING_STAT_INFO_FAILURE = "FETCHING_STAT_INFO_FAILURE";

export const getPokemon = apiUrl => dispatch => {
    dispatch({ type: API_CALL_FETCHING });
    axios
        .get(apiUrl)
        .then(res => {
            console.log("res: ", res.data);

            dispatch({ type: API_CALL_SUCCESS, payload: res.data });
            return res.data;
        })
        .then(res => {
            console.log("res before getting species: ", res);

            axios
                .get(res.species.url)
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
                    dispatch({
                        type: FETCHING_DEX_ENTRIES_FAILURE,
                        payload: err
                    });
                });
        })
        .catch(err => {
            // console.log("err: ", err);
            // console.log("err: apiUrl: ", apiUrl);
            dispatch({ type: API_CALL_FAILURE, payload: err });
        });
};

// export const getDexEntries = apiUrl => dispatch => {
//     dispatch({ type: FETCHING_DEX_ENTRIES });
//     axios
//         .get(apiUrl)
//         .then(res => {
//             console.log("res: ", res);
//             dispatch({ type: FETCHING_DEX_ENTRIES_SUCCESS, payload: res.data. })
//         })
//         .catch(err => {
//             console.log("err: ", err);
//         });
// };

export const getMoveInfo = apiUrl => dispatch => {
    dispatch({ type: FETCHING_MOVE_INFO });
    axios
        .get(apiUrl)
        .then(res => {
            // console.log("moves res: ", res);
            dispatch({ type: FETCHING_MOVE_INFO_SUCCESS, payload: res.data });
        })
        .catch(err => {
            console.log("error getting moves: ", err);
            dispatch({ type: FETCHING_MOVE_INFO_FAILURE, payload: err });
        });
};

export const getStatInfo = apiUrl => dispatch => {
    dispatch({ type: FETCHING_STAT_INFO });
    axios
        .get(apiUrl)
        .then(res => {
            console.log("stat info res: ".res);
            dispatch({ type: FETCHING_STAT_INFO_SUCCESS, payload: res.data });
        })
        .catch(err => {
            console.log("error getting stat info: ", err);
            dispatch({ type: FETCHING_STAT_INFO_FAILURE, payload: err });
        });
};
