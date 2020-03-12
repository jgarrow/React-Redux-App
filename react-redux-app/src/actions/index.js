import axios from "axios";

export const API_CALL_FETCHING = "API_CALL_FETCHING";
export const API_CALL_SUCCESS = "API_CALL_SUCCESS";
export const API_CALL_FAILURE = "API_CALL_FAILURE";
export const FETCHING_MOVE_INFO = "FETCHING_MOVES";
export const FETCHING_MOVE_INFO_SUCCESS = "FETCHING_MOVES_SUCCESS";
export const FETCHING_MOVE_INFO_FAILURE = "FETCHING_MOVES_FAILURE";
export const FETCHING_DEX_INFO = "FETCHING_DEX_INFO";
export const FETCHING_EVOLUTION_LINE = "FETCHING_EVOLUTION_LINE";
export const FETCHING_EVOLUTION_LINE_SUCCESS =
    "FETCHING_EVOLUTION_LINE_SUCCESS";
export const FETCHING_EVOLUTION_LINE_FAILURE =
    "FETCHING_EVOLUTION_LINE_FAILURE";
export const FETCHING_EVOL_SPRITE_SUCCESS = "FETCHING_EVOL_SPRITE_SUCCESS";
export const FETCHING_EVOL_SPRITE_FAILURE = "FETCHING_EVOL_SPRITE_FAILURE";
export const INCREMENT_INPUT = "INCREMENT_INPUT";
export const DECREMENT_INPUT = "DECREMENT_INPUT";
export const PROVIDED_NEW_INPUT = "PROVIDED_NEW_INPUT";

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
                    let dexNumArray = [];
                    let natDexNum = null;
                    let entries = [];

                    // array of dex objects for different pokedexes
                    dexNumArray = [...res.data["pokedex_numbers"]];

                    // find the national dex object
                    natDexNum = dexNumArray.length
                        ? dexNumArray.find(
                              obj => obj.pokedex.name === "national"
                          )
                        : "N/A";

                    // get just the national dex number
                    if (natDexNum !== "N/A") {
                        natDexNum = natDexNum["entry_number"];
                    }

                    entries = [...res.data["flavor_text_entries"]];

                    // only keep the english entries
                    entries = entries.filter(
                        entry => entry.language.name === "en"
                    );

                    // make all whitespace consistent by making them all spaces
                    entries.forEach(entry => {
                        entry["flavor_text"] = entry["flavor_text"].replace(
                            /\s/gm,
                            " "
                        );
                    });

                    // find and get rid of duplicate entries
                    entries = entries.reduce((acc, current) => {
                        const x = acc.find(
                            item =>
                                item["flavor_text"] === current["flavor_text"]
                        );
                        if (!x) {
                            return acc.concat([current]);
                        } else {
                            return acc;
                        }
                    }, []);

                    dispatch({
                        type: FETCHING_DEX_INFO,
                        payload: { dexEntries: entries, dexNum: natDexNum }
                    });

                    axios
                        .get(res.data["evolution_chain"].url)
                        .then(res => {
                            const evolineObj = { ...res.data.chain };

                            const evoIUrl = evolineObj.species.url;
                            const evoIIUrls = evolineObj["evolves_to"].map(
                                mon => {
                                    const url = mon.species.url;
                                    return url.replace("-species", "");
                                }
                            );

                            const evoIIIUrls = evolineObj["evolves_to"].map(
                                mon =>
                                    mon["evolves_to"].map(pokemon => {
                                        let monUrl = pokemon.species.url;
                                        return monUrl.replace("-species", "");
                                    })
                            );

                            const evolution_urls = {
                                evolution_I: evoIUrl.replace("-species", ""),
                                evolution_II: evoIIUrls,
                                evolution_III: evoIIIUrls
                            };

                            dispatch({
                                type: FETCHING_EVOLUTION_LINE_SUCCESS,
                                payload: res.data.chain // an array
                            });

                            return evolution_urls;
                        })
                        .catch(err => {
                            dispatch({
                                type: FETCHING_EVOLUTION_LINE_FAILURE,
                                payload: err
                            });
                        });
                })
                .catch(err => {
                    console.log("species err: ", err);
                });
        })
        .catch(err => {
            console.log("err with initial API call: ", err);
            dispatch({ type: API_CALL_FAILURE, payload: err });
        });
};

// used in MoveList component in RightPanel
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

export const updateInputNum = (updateType, newInput) => dispatch => {
    if (updateType === "increment") {
        dispatch({ type: INCREMENT_INPUT });
    } else if (updateType === "decrement") {
        dispatch({ type: DECREMENT_INPUT });
    } else if (updateType === "new input") {
        dispatch({ type: PROVIDED_NEW_INPUT, payload: newInput });
    }
};
