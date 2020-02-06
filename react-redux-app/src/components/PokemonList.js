import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getPokemon } from "../actions";

const PokemonList = props => {
    const handleGetPokemon = (e, apiUrl) => {
        e.preventDefault();
        props.getPokemon(apiUrl);
    };

    // need to refactor -- needs dependency of 'props', but I only want this function to be invoked once on the initial render
    useEffect(() => {
        props.getPokemon("https://pokeapi.co/api/v2/pokemon");
    }, []);

    return (
        <div>
            {props.pokemon.length > 0 ? (
                props.pokemon.map((mon, index) => (
                    <div key={index}>
                        <h2>{mon.name}</h2>
                    </div>
                ))
            ) : (
                <button
                    onClick={e =>
                        handleGetPokemon(e, "https://pokeapi.co/api/v2/pokemon")
                    }
                >
                    Get Pokemon
                </button>
            )}
            {props.previous && (
                <button onClick={e => handleGetPokemon(e, props.previous)}>
                    Previous
                </button>
            )}
            {props.next && (
                <button onClick={e => handleGetPokemon(e, props.next)}>
                    Next
                </button>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        pokemon: state.pokemon,
        isFetching: state.isFetching,
        next: state.next,
        previous: state.previous
    };
};

export default connect(mapStateToProps, { getPokemon })(PokemonList);
