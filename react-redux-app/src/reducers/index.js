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
    // genApiUrls is the starting query number for the API for the first pokemon in each generation
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
        evolution_I: [],
        evolution_II: [],
        evolution_III: []
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
                moves: movesArray
            };
        case FETCHING_MOVE_INFO_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case FETCHING_DEX_INFO:
            return {
                ...state,
                dexEntries: action.payload.dexEntries,
                dexNum: action.payload.dexNum,
                error: ""
            };
        case FETCHING_EVOLUTION_LINE_SUCCESS:
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
            return {
                ...state,
                evolution_line: evolutions,
                previous_evolution_line: prev_evo_line,
                evolution_sprites: evolution_urls,
                error: "",
                isFetching: false
            };
        case FETCHING_EVOLUTION_LINE_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case FETCHING_EVOL_SPRITE_SUCCESS:
            return {
                ...state,
                error: ""
            };
        case FETCHING_EVOL_SPRITE_FAILURE:
            return {
                ...state,
                error: action.payload
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
