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
    FETCHING_STAT_INFO,
    FETCHING_STAT_INFO_SUCCESS,
    FETCHING_STAT_INFO_FAILURE
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
    // next: null,
    // previous: null,
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
                // next: null,
                // previous: null
            };
        case API_CALL_SUCCESS:
            // console.log("action.payload: ", action.payload);
            // console.log("sprite: ", action.payload.sprites["front_default"]);
            return {
                ...state,
                pokemon: action.payload,
                moves: action.payload.moves,
                error: "",
                isFetching: false
                // next: action.payload.next,
                // previous: action.payload.previous
            };
        case API_CALL_FAILURE:
            return {
                ...state,
                error: action.payload,
                isFetching: false
                // next: null,
                // previous: null
            };
        case FETCHING_DEX_ENTRIES:
            return {
                ...state,
                isFetching: true,
                error: ""
            };
        case FETCHING_DEX_ENTRIES_SUCCESS:
            let entries = [...action.payload];
            const englishEntries = entries.filter(
                entry => entry.language.name === "en"
            );

            // console.log("english entries: ", englishEntries);

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
        case FETCHING_STAT_INFO:
            return {
                ...state,
                error: "",
                isFetching: true
            };
        case FETCHING_STAT_INFO_SUCCESS:
            let statsArray = [...state.stats];
            const statIndex = statsArray.findIndex(
                stat => stat.stat.name === action.payload
            );

            return {
                ...state,
                error: "",
                isFetching: false
            };
        case FETCHING_STAT_INFO_FAILURE:
            return {
                ...state,
                error: action.payload,
                isFetching: false
            };
        default:
            return state;
    }
};
