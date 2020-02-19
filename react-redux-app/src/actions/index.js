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
export const FETCHING_EVOLUTION_LINE = "FETCHING_EVOLUTION_LINE";
export const FETCHING_EVOLUTION_LINE_SUCCESS =
    "FETCHING_EVOLUTION_LINE_SUCCESS";
export const FETCHING_EVOLUTION_LINE_FAILURE =
    "FETCHING_EVOLUTION_LINE_FAILURE";
export const FETCHING_EVOL_SPRITE_SUCCESS = "FETCHING_EVOL_SPRITE_SUCCESS";
export const FETCHING_EVOL_SPRITE_FAILURE = "FETCHING_EVOL_SPRITE_FAILURE";

export const getPokemon = apiUrl => dispatch => {
    dispatch({ type: API_CALL_FETCHING });
    axios
        .get(apiUrl)
        .then(res => {
            dispatch({ type: API_CALL_SUCCESS, payload: res.data });
            return res.data;
        })
        .then(res => {
            axios
                .get(res.species.url)
                .then(res => {
                    dispatch({
                        type: FETCHING_DEX_ENTRIES_SUCCESS,
                        payload: res.data
                    });

                    axios
                        .get(res.data["evolution_chain"].url)
                        .then(res => {
                            const evolineObj = { ...res.data.chain };

                            const evol_I = evolineObj.species.name;

                            // array of strings
                            const evol_II = evolineObj["evolves_to"].map(
                                mon => mon.species.name
                            );

                            // array of strings
                            const evol_III = evolineObj["evolves_to"].map(
                                mon =>
                                    mon["evolves_to"]
                                        .map(pokemon => pokemon.species.name)
                                        .toString() // need to convert to string, otherwise all of the names will be in an array; don't want an array of arrays
                            );

                            const evolutions = {
                                evolution_I: evol_I,
                                evolution_II: evol_II,
                                evolution_III: evol_III
                            };

                            console.log("evolutions in action: ", evolutions);

                            dispatch({
                                type: FETCHING_EVOLUTION_LINE_SUCCESS,
                                payload: res.data.chain // an array
                            });

                            return evolutions;
                        })
                        .then(res => {
                            const baseApiUrl =
                                "https://pokeapi.co/api/v2/pokemon/";

                            let evol_II_urls = res["evolution_II"];
                            evol_II_urls = evol_II_urls.map(
                                mon => `${baseApiUrl}${mon}`
                            );

                            let evol_III_urls = res["evolution_III"].toString();

                            evol_III_urls = evol_III_urls.split(",");

                            evol_III_urls = evol_III_urls.map(
                                mon => `${baseApiUrl}${mon}`
                            );

                            const evol_I_url = `${baseApiUrl}${res["evolution_I"]}`;

                            const evolution_urls = {
                                evol_I: evol_I_url,
                                evol_II: evol_II_urls,
                                evol_III: evol_III_urls
                            };

                            axios
                                .get(evolution_urls["evol_I"])
                                .then(res => {
                                    dispatch({
                                        type: FETCHING_EVOL_SPRITE_SUCCESS,
                                        payload: {
                                            evolution_tier: "evol_I",
                                            sprite:
                                                res.data.sprites[
                                                    "front_default"
                                                ]
                                        }
                                    });
                                })
                                .catch(err => {
                                    console.log(
                                        "error getting evol_I sprite: ",
                                        err
                                    );
                                    dispatch({
                                        type: FETCHING_EVOL_SPRITE_FAILURE,
                                        payload: err
                                    });
                                });

                            evolution_urls["evol_II"].map(url => {
                                axios
                                    .get(url)
                                    .then(res => {
                                        dispatch({
                                            type: FETCHING_EVOL_SPRITE_SUCCESS,
                                            payload: {
                                                evolution_tier: "evol_II",
                                                sprite:
                                                    res.data.sprites[
                                                        "front_default"
                                                    ]
                                            }
                                        });
                                    })
                                    .catch(err => {
                                        console.log(
                                            "error getting evolution II: ",
                                            err
                                        );
                                        dispatch({
                                            type: FETCHING_EVOL_SPRITE_FAILURE,
                                            payload: err
                                        });
                                    });
                            });

                            evolution_urls["evol_III"].map(url => {
                                axios
                                    .get(url)
                                    .then(res => {
                                        dispatch({
                                            type: FETCHING_EVOL_SPRITE_SUCCESS,
                                            payload: {
                                                evolution_tier: "evol_III",
                                                sprite:
                                                    res.data.sprites[
                                                        "front_default"
                                                    ]
                                            }
                                        });
                                    })
                                    .catch(err => {
                                        console.log(
                                            "error getting evolution III: ",
                                            err
                                        );
                                        dispatch({
                                            type: FETCHING_EVOL_SPRITE_FAILURE,
                                            payload: err
                                        });
                                    });
                            });
                        })
                        .catch(err => {
                            console.log("error fetching evolution line: ", err);
                            dispatch({
                                type: FETCHING_EVOLUTION_LINE_FAILURE,
                                payload: err
                            });
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
            console.log("err with initial API call: ", err);
            dispatch({ type: API_CALL_FAILURE, payload: err });
        });
};

export const getMoveInfo = apiUrl => dispatch => {
    dispatch({ type: FETCHING_MOVE_INFO });
    axios
        .get(apiUrl)
        .then(res => {
            dispatch({ type: FETCHING_MOVE_INFO_SUCCESS, payload: res.data });
        })
        .catch(err => {
            console.log("error getting moves: ", err);
            dispatch({ type: FETCHING_MOVE_INFO_FAILURE, payload: err });
        });
};
