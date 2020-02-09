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
            // console.log("res: ", res.data);

            dispatch({ type: API_CALL_SUCCESS, payload: res.data });
            return res.data;
        })
        .then(res => {
            console.log("res before getting species: ", res);

            axios
                .get(res.species.url)
                .then(res => {
                    // console.log(
                    //     "species res: ",
                    //     res.data["flavor_text_entries"]
                    // );
                    dispatch({
                        type: FETCHING_DEX_ENTRIES_SUCCESS,
                        payload: res.data["flavor_text_entries"]
                    });

                    axios
                        .get(res.data["evolution_chain"].url)
                        .then(res => {
                            // console.log("Evolution chain res: ", res);
                            // console.log(
                            //     "Evolution chain res: ",
                            //     res.data.chain
                            // );

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

                            dispatch({
                                type: FETCHING_EVOLUTION_LINE_SUCCESS,
                                payload: res.data.chain // an array
                            });

                            return evolutions;
                        })
                        .then(res => {
                            // console.log(
                            //     "res after finishing evolution chain: ",
                            //     res
                            // );
                            const baseApiUrl =
                                "https://pokeapi.co/api/v2/pokemon/";

                            let evol_II_urls = res["evolution_II"];
                            evol_II_urls = evol_II_urls.map(
                                mon => `${baseApiUrl}${mon}`
                            );

                            // console.log("evol_II_urls array: ", evol_II_urls);

                            let evol_III_urls = res["evolution_III"];
                            evol_III_urls = evol_III_urls.map(
                                mon => `${baseApiUrl}${mon}`
                            );

                            // console.log("evol_III_urls array: ", evol_III_urls);

                            const evol_I_url = `${baseApiUrl}${res["evolution_I"]}`;
                            // const evol_II_url = `${baseApiUrl}${res["evolution_II"][0]}`;
                            // const evol_III_url = `${baseApiUrl}${res["evolution_III"][0]}`;

                            // console.log("evol_I_url: ", evol_I_url);
                            // console.log("evol_II_url: ", evol_II_url);
                            // console.log("evol_III_url: ", evol_III_url);

                            const evolution_urls = {
                                evol_I: evol_I_url,
                                evol_II: evol_II_urls,
                                evol_III: evol_III_urls
                            };

                            axios
                                .get(evolution_urls["evol_I"])
                                .then(res => {
                                    console.log("evol_I res: ", res.data);
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
                                        // console.log(
                                        //     "evol_II url res: ",
                                        //     res.data.sprites["front_default"]
                                        // );
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
                                        // console.log("evol_III res: ", res.data);
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
            // console.log("err: apiUrl: ", apiUrl);
            dispatch({ type: API_CALL_FAILURE, payload: err });
        });
};

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
