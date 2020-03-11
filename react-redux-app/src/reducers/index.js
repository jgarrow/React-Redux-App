import {
    API_CALL_FETCHING,
    API_CALL_SUCCESS,
    API_CALL_FAILURE,
    FETCHING_MOVE_INFO,
    FETCHING_MOVE_INFO_SUCCESS,
    FETCHING_MOVE_INFO_FAILURE,
    FETCHING_DEX_INFO,
    FETCHING_EVOLUTION_LINE_SUCCESS,
    FETCHING_EVOLUTION_LINE_FAILURE,
    FETCHING_EVOL_SPRITE_SUCCESS,
    FETCHING_EVOL_SPRITE_FAILURE,
    INCREMENT_INPUT,
    DECREMENT_INPUT,
    PROVIDED_NEW_INPUT
} from "../actions";

const initialState = {
    genApiUrls: {
        gen1: 1,
        gen2: 152,
        gen3: 252,
        gen4: 387,
        gen5: 495,
        gen6: 650,
        gen7: 722,
        gen8: null
    },
    pokemon: {},
    moves: [],
    evolution_line: {},
    previous_evolution_line: {},
    evolution_sprites: {
        evol_I: [],
        evol_II: [],
        evol_III: []
    },
    dexEntries: [],
    dexNum: 0,
    inputNum: 1,
    error: "",
    isFetching: false
};

export const pokemonReducer = (state = initialState, action) => {
    switch (action.type) {
        case API_CALL_FETCHING:
            console.log("API_CALL_FETCHING");
            // reset state when new api call is made
            return {
                ...state,
                pokemon: {},
                moves: [],
                evolution_line: {},
                previous_evolution_line: {},
                evolution_sprites: {
                    evol_I: [],
                    evol_II: [],
                    evol_III: []
                },
                error: "",
                isFetching: true
            };
        case API_CALL_SUCCESS:
            console.log("API_CALL_SUCCESS");
            let movesArr = [...action.payload.moves];

            //compare function for sorting array
            function compareValues(key, order = "asc") {
                return function innerSort(a, b) {
                    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                        return 0;
                    }

                    // if learned by level, value will be an int
                    // want all of the moves learned by level first (highest level = 100)
                    let varA = typeof a[key] === "string" ? 101 : a[key];
                    let varB = typeof b[key] === "string" ? 101 : b[key];

                    // if they're both strings (neither are learned by level), now we want to alphabetize them
                    if (
                        typeof a[key] === "string" &&
                        typeof b[key] === "string"
                    ) {
                        varA = a[key].toUpperCase();
                        varB = b[key].toUpperCase();
                    }

                    let comparison = 0;
                    if (varA > varB) {
                        comparison = 1;
                    } else if (varA < varB) {
                        comparison = -1;
                    }
                    return order === "desc" ? comparison * -1 : comparison;
                };
            }

            // add "learnMethod" key for each move
            movesArr.forEach(move => {
                move.learnMethod =
                    move["version_group_details"][0]["level_learned_at"] !== 0
                        ? parseInt(
                              move["version_group_details"][0][
                                  "level_learned_at"
                              ]
                          )
                        : move["version_group_details"][0]["move_learn_method"]
                              .name;
            });

            movesArr.sort(compareValues("learnMethod"));

            return {
                ...state,
                pokemon: action.payload,
                moves: movesArr,
                error: ""
                // isFetching: false
            };
        case API_CALL_FAILURE:
            return {
                ...state,
                error: action.payload,
                isFetching: false
            };
        case FETCHING_MOVE_INFO:
            return {
                ...state,
                error: ""
                // isFetching: true
            };
        case FETCHING_MOVE_INFO_SUCCESS:
            let movesArray = [...state.moves];

            const moveIndex = movesArray.findIndex(
                move => move.move.name === action.payload.name
            );

            movesArray[moveIndex] = {
                ...movesArray[moveIndex],
                moveInfo: action.payload
            };

            return {
                ...state,
                error: "",
                // isFetching: false,
                moves: movesArray
            };
        case FETCHING_MOVE_INFO_FAILURE:
            return {
                ...state,
                error: action.payload
                // isFetching: false
            };
        case FETCHING_DEX_INFO:
            return {
                ...state,
                dexEntries: action.payload.dexEntries,
                dexNum: action.payload.dexNum,
                error: ""
            };
        case FETCHING_EVOLUTION_LINE_SUCCESS:
            let evoIISprites = [...state["evolution_sprites"]["evol_II"]];
            let evoIIISprites = [...state["evolution_sprites"]["evol_III"]];

            // want to set the `previous_evolution_line` to what the current `evolution_line` is before it gets updated
            const prev_evo_line = { ...state["evolution_line"] };

            // structure of action.payload = res.data.chain
            const evolineObj = { ...action.payload };

            const evol_I = evolineObj.species.name;

            // array of strings
            const evol_II = evolineObj["evolves_to"].map(
                mon => mon.species.name
            );

            // array of strings
            let evol_III = evolineObj["evolves_to"]
                .map(mon =>
                    mon["evolves_to"]
                        .map(pokemon => pokemon.species.name)
                        .toString()
                )
                .toString();
            evol_III = evol_III.split(",");

            const evolutions = {
                evolution_I: evol_I,
                evolution_II: evol_II,
                evolution_III: evol_III
            };

            // if they're the same, evoIIArraysAreSame will be the length of the array - 1
            let evoIIArraysAreSame = false;
            if (prev_evo_line["evolution_II"]) {
                for (let i = 0; i < prev_evo_line["evolution_II"].length; i++) {
                    if (
                        prev_evo_line["evolution_II"][i] ===
                        evolutions["evolution_II"][i]
                    ) {
                        evoIIArraysAreSame = true;
                    }
                }

                // reset the tier III evolution sprites in state to an empty array if the evolution line has changed
                if (!evoIIArraysAreSame) {
                    evoIISprites = [];
                }
            }

            // if they're the same, evoIIArraysAreSame will be the length of the array - 1
            let evoIIIArraysAreSame = false;
            if (prev_evo_line["evolution_III"]) {
                for (
                    let i = 0;
                    i < prev_evo_line["evolution_III"].length;
                    i++
                ) {
                    if (
                        prev_evo_line["evolution_III"][i] ===
                        evolutions["evolution_III"][i]
                    ) {
                        evoIIArraysAreSame = true;
                    }
                }

                // reset the tier III evolution sprites in state to an empty array if the evolution line has changed
                if (!evoIIIArraysAreSame) {
                    evoIIISprites = [];
                }
            }

            // console.log("evolutions in reducer: ", evolutions);

            const spriteBase =
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
            const regExp = /[a-zA-Z]*\/?/g;

            let evoIUrl = evolineObj.species.url.slice(-5);

            // get rid of the trailing "/"
            if (evoIUrl[evoIUrl.length - 1] === "/") {
                evoIUrl = evoIUrl.slice(0, -1);
            }

            const evoImatch = evoIUrl.match(regExp);
            const indexToRemove = evoImatch[0].length;

            // get rid of everything before "/#"
            evoIUrl = evoIUrl.slice(indexToRemove > 1 ? indexToRemove - 1 : 0);

            evoIUrl = spriteBase + evoIUrl + ".png";

            let evoIIUrls = evolineObj["evolves_to"].map(mon => {
                let url = mon.species.url.slice(-5);

                // get rid of the trailing "/"
                if (url[url.length - 1] === "/") {
                    url = url.slice(0, -1);
                }

                const evoIImatch = url.match(regExp);
                const amntToRemove = evoIImatch[0].length;

                // get rid of everything before "/#"
                url = url.slice(amntToRemove > 1 ? amntToRemove - 1 : 0);

                url = spriteBase + url + ".png";

                return url;
            });

            let evoIIIUrls = evolineObj["evolves_to"].map(mon =>
                mon["evolves_to"].map(pokemon => {
                    let url = pokemon.species.url.slice(-5);

                    // get rid of the trailing "/"
                    if (url[url.length - 1] === "/") {
                        url = url.slice(0, -1);
                    }

                    const evoIIImatch = url.match(regExp);
                    const remove = evoIIImatch[0].length;

                    // get rid of everything before "/#"
                    url = url.slice(remove > 1 ? remove - 1 : 0);

                    url = spriteBase + url + ".png";

                    return url;
                })
            );

            // evo III is an array of arrays, so we need to "flatten" it to be an array of strings
            evoIIIUrls = evoIIIUrls.flat();

            const evolution_urls = {
                evolution_I: evoIUrl,
                evolution_II: evoIIUrls,
                evolution_III: evoIIIUrls
            };

            console.log("evolineObj: ", evolineObj);
            console.log("evolution_urls: ", evolution_urls);

            return {
                ...state,
                evolution_line: evolutions,
                previous_evolution_line: prev_evo_line,
                evolution_sprites: evolution_urls,
                // {
                //     ...state["evolution_sprites"],
                //     evol_I: evoIUrl,
                //     evol_II: evoIISprites,
                //     evol_III: evoIIISprites
                // },
                error: ""
                // isFetching: false
            };
        case FETCHING_EVOLUTION_LINE_FAILURE:
            return {
                ...state,
                error: action.payload
                // isFetching: false
            };
        case FETCHING_EVOL_SPRITE_SUCCESS:
            // let payload_evolution = action.payload["evolution_tier"];
            // const evolutionSprites = { ...state["evolution_sprites"] };
            // let updatedSprites = null;

            // // need to reset evol_II and evol_III arrays when querying for a pokemon that has a different evolution_line
            // if (payload_evolution === "evol_I") {
            //     evolutionSprites["evol_I"] = [action.payload.sprite];
            // } else if (payload_evolution === "evol_II") {
            //     updatedSprites = [...state["evolution_sprites"]["evol_II"]];

            //     // to prevent re "setting" state if the action.payload is the same as the current state
            //     if (
            //         updatedSprites[updatedSprites.length - 1] !==
            //         action.payload.sprite
            //     ) {
            //         evolutionSprites["evol_II"] = [
            //             ...evolutionSprites["evol_II"],
            //             action.payload.sprite
            //         ];
            //     }
            // } else if (payload_evolution === "evol_III") {
            //     updatedSprites = [...state["evolution_sprites"]["evol_III"]];

            //     // to prevent re "setting" state if the action.payload is the same as the current state
            //     if (
            //         updatedSprites[updatedSprites.length - 1] !==
            //         action.payload.sprite
            //     ) {
            //         evolutionSprites["evol_III"] = [
            //             ...evolutionSprites["evol_III"],
            //             action.payload.sprite
            //         ];
            //     }
            // }

            // // logic to reorder the evolutionSprites for tier II so that they match the same order of the names for the sprites
            // let evoIIUrlDexNumArray = evolutionSprites["evol_II"].map(
            //     (url, index) => {
            //         // get the last 7 characters (should be "###.png" or "/##.png")
            //         let urlDexNum = url.slice(-7);

            //         // if the first char is "/", get rid of it
            //         if (urlDexNum.charAt(0) === "/") {
            //             urlDexNum = urlDexNum.slice(1);
            //         }

            //         // get rid of the ".png" at the end and convert it to a num
            //         urlDexNum = parseInt(urlDexNum.slice(0, 3));

            //         return { dex: urlDexNum, imgSrc: url, currIndex: index };
            //     }
            // );

            // // sort the array by lowest to highest urlDexNum value at key "dex"
            // evoIIUrlDexNumArray.sort((a, b) => (a.dex < b.dex ? -1 : 1));

            // // update the value of "currIndex" to be the newly sorted index
            // evoIIUrlDexNumArray.forEach((num, index) => {
            //     num.currIndex = index;
            // });

            // // update evolutionSprites to reflect the new order that the images should be in to match the evolution_line
            // evolutionSprites["evol_II"] = evoIIUrlDexNumArray.map(
            //     obj => obj.imgSrc
            // );

            // // logic to reorder the evolutionSprites for tier III so that they match the same order of the names for the sprites
            // let evoIIIUrlDexNumArray = evolutionSprites["evol_III"].map(
            //     (url, index) => {
            //         // get the last 7 characters (should be "###.png" or "/##.png")
            //         let urlDexNum = url.slice(-7);

            //         // if the first char is "/", get rid of it
            //         if (urlDexNum.charAt(0) === "/") {
            //             urlDexNum = urlDexNum.slice(1);
            //         }

            //         // get rid of the ".png" at the end and convert it to a num
            //         urlDexNum = parseInt(urlDexNum.slice(0, 3));

            //         return { dex: urlDexNum, imgSrc: url, currIndex: index };
            //     }
            // );

            // // sort the array by lowest to highest urlDexNum value at key "dex"
            // evoIIIUrlDexNumArray.sort((a, b) => (a.dex < b.dex ? -1 : 1));

            // // update the value of "currIndex" to be the newly sorted index
            // evoIIIUrlDexNumArray.forEach((num, index) => {
            //     num.currIndex = index;
            // });

            // // update evolutionSprites to reflect the new order that the images should be in to match the evolution_line
            // evolutionSprites["evol_III"] = evoIIIUrlDexNumArray.map(
            //     obj => obj.imgSrc
            // );

            // let isLoading = true;
            // if (
            //     action.payload["evolution_tier"] === "evol_III" || // if we've gotten the last evolution
            //     !(evolutionSprites["evol_II"].length > 0) || // if there is no second evolution
            //     !(evolutionSprites["evol_III"].length > 0) // if there is no third evolution
            // ) {
            //     // console.log(
            //     //     "in last evolution OR there's no 2nd evo OR there's no 3rd evo"
            //     // );
            //     isLoading = false;
            // }

            return {
                ...state,
                error: ""
                // isFetching: isLoading,
                // evolution_sprites: evolutionSprites
            };
        case FETCHING_EVOL_SPRITE_FAILURE:
            return {
                ...state,
                error: action.payload
                // isFetching: false
            };
        case INCREMENT_INPUT:
            let newInput = state.inputNum + 1;

            if (newInput > 806) {
                newInput = 1;
            }

            return {
                ...state,
                inputNum: newInput
            };
        case DECREMENT_INPUT:
            let updatedInput = state.inputNum - 1;

            if (updatedInput < 1) {
                updatedInput = 806;
            }

            return {
                ...state,
                inputNum: updatedInput
            };
        case PROVIDED_NEW_INPUT:
            return {
                ...state,
                inputNum: action.payload
            };
        default:
            return state;
    }
};
