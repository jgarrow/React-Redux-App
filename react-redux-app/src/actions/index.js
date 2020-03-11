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
            console.log("first API call");
            dispatch({ type: API_CALL_SUCCESS, payload: res.data });
            return res.data;
        })
        .then(res => {
            axios
                .get(res.species.url)
                .then(res => {
                    console.log("second API call");
                    // console.log("res from res.species.url: ", res.data);

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
                            console.log("third API call");
                            // console.log(
                            //     `res from res.data["evolution_chain"].url: `,
                            //     res.data
                            // );
                            const evolineObj = { ...res.data.chain };

                            // const evol_I = evolineObj.species.name;

                            // // array of strings
                            // const evol_II = evolineObj["evolves_to"].map(
                            //     mon => mon.species.name
                            // );

                            // // array of strings
                            // const evol_III = evolineObj["evolves_to"].map(
                            //     mon =>
                            //         mon["evolves_to"]
                            //             .map(pokemon => pokemon.species.name)
                            //             .toString() // need to convert to string, otherwise all of the names will be in an array; don't want an array of arrays
                            // );

                            // const evolutions = {
                            //     evolution_I: evol_I,
                            //     evolution_II: evol_II,
                            //     evolution_III: evol_III
                            // };

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

                            // const spriteBase =
                            //     "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

                            // let evoIUrl = evolineObj.species.url.slice(-5);
                            // console.log("evoIUrl: ", evoIUrl);
                            // let evoIArray = [...evoIUrl];
                            // evoIArray.forEach((char, index) => {
                            //     if (!Number(char)) {
                            //         // char.replace(char, "");
                            //         console.log("char is not a num: ", char);
                            //         evoIArray.splice(index, 1);
                            //     }
                            // });
                            // evoIUrl = evoIArray.join("");

                            // evoIUrl = spriteBase + evoIUrl + ".png";

                            // console.log("evoIUrl: ", evoIArray);
                            // console.log("evoIUrl: ", evoIUrl);

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
                        .then(res => {
                            console.log("Part II of third API call");
                            // const baseApiUrl =
                            //     "https://pokeapi.co/api/v2/pokemon/";

                            let evol_II_urls = res["evolution_II"];
                            // evol_II_urls = evol_II_urls.map(
                            //     mon => `${baseApiUrl}${mon}`
                            // );

                            let evol_III_urls = res["evolution_III"].length
                                ? res["evolution_III"].toString()
                                : [];

                            evol_III_urls = evol_III_urls.length
                                ? evol_III_urls.split(",")
                                : [];

                            // evol_III_urls = evol_III_urls.length
                            //     ? evol_III_urls.map(
                            //           mon => `${baseApiUrl}${mon}`
                            //       )
                            //     : [];

                            // const evol_I_url = `${baseApiUrl}${res["evolution_I"]}`;
                            const evol_I_url = res["evolution_I"];

                            const evolution_urls = {
                                evol_I: evol_I_url,
                                evol_II: evol_II_urls,
                                evol_III: evol_III_urls
                            };

                            // console.log("evolution_urls: ", evolution_urls);

                            axios
                                .get(evolution_urls["evol_I"])
                                .then(res => {
                                    console.log("fourth API call");
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

                            evolution_urls["evol_II"].forEach(url => {
                                axios
                                    .get(url)
                                    .then(res => {
                                        console.log("fifth API call");
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

                            evolution_urls["evol_III"].length &&
                                evolution_urls["evol_III"].forEach(url => {
                                    axios
                                        .get(url)
                                        .then(res => {
                                            console.log("sixth API call");
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
                });
        })
        .catch(err => {
            console.log("err with initial API call: ", err);
            dispatch({ type: API_CALL_FAILURE, payload: err });
        });
};

// used in MoveList component in RightPanel
// export const getMoveInfo = apiUrl => dispatch => {
//     dispatch({ type: FETCHING_MOVE_INFO });
//     axios
//         .get(apiUrl)
//         .then(res => {
//             console.log("fetching moves API call");
//             dispatch({ type: FETCHING_MOVE_INFO_SUCCESS, payload: res.data });
//         })
//         .catch(err => {
//             console.log("error getting moves: ", err);
//             dispatch({ type: FETCHING_MOVE_INFO_FAILURE, payload: err });
//         });
// };

export const updateInputNum = (updateType, newInput) => dispatch => {
    if (updateType === "increment") {
        dispatch({ type: INCREMENT_INPUT });
    } else if (updateType === "decrement") {
        dispatch({ type: DECREMENT_INPUT });
    } else if (updateType === "new input") {
        dispatch({ type: PROVIDED_NEW_INPUT, payload: newInput });
    }
};
