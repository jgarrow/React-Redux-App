import {
    API_CALL_FETCHING,
    API_CALL_SUCCESS,
    API_CALL_FAILURE,
    FETCHING_DEX_ENTRIES,
    FETCHING_DEX_ENTRIES_SUCCESS,
    FETCHING_DEX_ENTRIES_FAILURE,
    FETCHING_MOVE_INFO,
    FETCHING_MOVE_INFO_SUCCESS,
    FETCHING_MOVE_INFO_FAILURE,
    FETCHING_EVOLUTION_LINE_SUCCESS,
    FETCHING_EVOLUTION_LINE_FAILURE,
    FETCHING_EVOL_SPRITE_SUCCESS,
    FETCHING_EVOL_SPRITE_FAILURE
} from "../actions";

const initialState = {
    genApiUrls: {
        gen1: "https://pokeapi.co/api/v2/pokemon",
        gen2: "https://pokeapi.co/api/v2/pokemon/?offset=151&limit=20",
        gen3: "https://pokeapi.co/api/v2/pokemon/?offset=251&limit=20",
        gen4: "https://pokeapi.co/api/v2/pokemon/?offset=386&limit=20",
        gen5: "https://pokeapi.co/api/v2/pokemon/?offset=494&limit=20",
        gen6: "https://pokeapi.co/api/v2/pokemon/?offset=649&limit=20",
        gen7: "https://pokeapi.co/api/v2/pokemon/?offset=721&limit=20",
        gen8: null
    },
    pokemon: {},
    dexEntries: [],
    moves: [],
    stats: [
        {
            name: "speed",
            stat: null
        },
        {
            name: "special-defense",
            stat: null
        },
        {
            name: "special-attack",
            stat: null
        },
        {
            name: "defense",
            stat: null
        },
        {
            name: "attack",
            stat: null
        },
        {
            name: "hp",
            stat: null
        }
    ],
    evolution_line: {},
    previous_evolution_line: {},
    evolution_sprites: {
        evol_I: null,
        evol_II: [],
        evol_III: []
    },
    error: "",
    isFetching: false
};

export const pokemonReducer = (state = initialState, action) => {
    switch (action.type) {
        case API_CALL_FETCHING:
            return {
                ...state,
                error: "",
                isFetching: true
                // evolution_sprites: {
                //     evol_I: null,
                //     evol_II: [],
                //     evol_III: []
                // }
            };
        case API_CALL_SUCCESS:
            return {
                ...state,
                pokemon: action.payload,
                moves: action.payload.moves,
                error: "",
                isFetching: false
            };
        case API_CALL_FAILURE:
            return {
                ...state,
                error: action.payload,
                isFetching: false
            };
        case FETCHING_DEX_ENTRIES:
            return {
                ...state,
                isFetching: true,
                error: ""
            };
        case FETCHING_DEX_ENTRIES_SUCCESS:
            let entries = [...action.payload];
            let englishEntries = entries.filter(
                entry => entry.language.name === "en"
            );

            englishEntries.forEach(entry => {
                entry["flavor_text"] = entry["flavor_text"].replace(
                    /\s/gm,
                    " "
                );
            });

            // console.log("english entries: ", englishEntries);

            // let entriesAreSame =
            //     englishEntries[2]["flavor_text"].valueOf() ===
            //     englishEntries[4]["flavor_text"].valueOf();

            // console.log("entries 2 and 4 are same: ", entriesAreSame);

            // only removing some of the duplicates, but not all
            // not sure why...I think it's something with some of the carriage returns?
            const removedDuplicates = englishEntries.reduce((acc, current) => {
                const x = acc.find(
                    item => item["flavor_text"] === current["flavor_text"]
                );
                if (!x) {
                    return acc.concat([current]);
                } else {
                    return acc;
                }
            }, []);

            // console.log("removedDuplicates array: ", removedDuplicates);

            return {
                ...state,
                error: "",
                dexEntries: englishEntries,
                isFetching: false
            };
        case FETCHING_DEX_ENTRIES_FAILURE:
            return {
                ...state,
                error: action.payload,
                isFetching: false
            };
        case FETCHING_MOVE_INFO:
            return {
                ...state,
                error: "",
                isFetching: true
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
                isFetching: false,
                moves: movesArray
            };
        case FETCHING_MOVE_INFO_FAILURE:
            return {
                ...state,
                error: action.payload,
                isFetching: false
            };
        case FETCHING_EVOLUTION_LINE_SUCCESS:
            // console.log("action.payload in fetching evo line:", action.payload);

            let evoIISprites = [...state["evolution_sprites"]["evol_II"]];
            let evoIIISprites = [...state["evolution_sprites"]["evol_III"]];

            // want to set the `previous_evolution_line` to what the current `evolution_line` is before it gets updated
            const prev_evo_line = { ...state["evolution_line"] };

            // action.payload = res.data.chain
            const evolineObj = { ...action.payload };

            const evol_I = evolineObj.species.name;

            // array of strings
            const evol_II = evolineObj["evolves_to"].map(
                mon => mon.species.name
            );

            // array of strings
            const evol_III = evolineObj["evolves_to"].map(mon =>
                mon["evolves_to"]
                    .map(pokemon => pokemon.species.name)
                    .toString()
            );

            const evolutions = {
                evolution_I: evol_I,
                evolution_II: evol_II,
                evolution_III: evol_III
            };

            // if they're the same, evoIIArraysAreSame will be the length of the array - 1
            let evoIIArraysAreSame = false;
            if (prev_evo_line["evolution_II"]) {
                for (let i = 0; i < prev_evo_line["evolution_II"].length; i++) {
                    console.log(
                        `prevo evoII at index ${i}: `,
                        prev_evo_line["evolution_II"][i]
                    );
                    console.log(
                        `updated evoII at index ${i}: `,
                        evolutions["evolution_II"][i]
                    );

                    if (
                        prev_evo_line["evolution_II"][i] ===
                        evolutions["evolution_II"][i]
                    ) {
                        console.log(
                            `prev and evolutions are same at index ${i}`
                        );
                        evoIIArraysAreSame = true;
                    }
                }
                console.log("evoIIArraysAreSame: ", evoIIArraysAreSame);

                if (
                    !evoIIArraysAreSame
                    // prev_evo_line["evolution_II"].length - 1
                ) {
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

                if (
                    !evoIIIArraysAreSame
                    // prev_evo_line["evolution_III"].length - 1
                ) {
                    evoIIISprites = [];
                }
            }
            // console.log("evolineObj: ", evolineObj);

            // evolutions is an array of objects
            // console.log("evolutions: ", evolutions);

            return {
                ...state,
                evolution_line: evolutions,
                previous_evolution_line: prev_evo_line,
                evolution_sprites: {
                    ...state["evolution_sprites"],
                    evol_II: evoIISprites,
                    evol_III: evoIIISprites
                },
                error: "",
                isFetching: false
            };
        case FETCHING_EVOLUTION_LINE_FAILURE:
            return {
                ...state,
                error: action.payload,
                isFetching: false
            };
        case FETCHING_EVOL_SPRITE_SUCCESS:
            let payload_evolution = action.payload["evolution_tier"];
            const evolutionSprites = { ...state["evolution_sprites"] };
            let updatedSprites = null;

            // console.log(
            //     "evolutionSprites in reducer before updating: ",
            //     evolutionSprites
            // );

            // need to reset evol_II and evol_III arrays when querying for a pokemon that has a different evolution_line

            if (payload_evolution === "evol_I") {
                evolutionSprites["evol_I"] = action.payload.sprite;
            } else if (payload_evolution === "evol_II") {
                updatedSprites = [...state["evolution_sprites"]["evol_II"]];

                // to prevent re "setting" state if the action.payload is the same as the current state
                if (
                    updatedSprites[updatedSprites.length - 1] !==
                    action.payload.sprite
                ) {
                    evolutionSprites["evol_II"] = [
                        ...evolutionSprites["evol_II"],
                        action.payload.sprite
                    ];
                }
            } else if (payload_evolution === "evol_III") {
                updatedSprites = [...state["evolution_sprites"]["evol_III"]];

                // to prevent re "setting" state if the action.payload is the same as the current state
                if (
                    updatedSprites[updatedSprites.length - 1] !==
                    action.payload.sprite
                ) {
                    evolutionSprites["evol_III"] = [
                        ...evolutionSprites["evol_III"],
                        action.payload.sprite
                    ];
                }
            }

            // console.log(
            //     "evolutionSprites in reducer after updating: ",
            //     evolutionSprites
            // );

            return {
                ...state,
                error: "",
                isFetching: false,
                evolution_sprites: evolutionSprites
            };
        case FETCHING_EVOL_SPRITE_FAILURE:
            return {
                ...state,
                error: action.payload,
                isFetching: false
            };

        default:
            return state;
    }
};
