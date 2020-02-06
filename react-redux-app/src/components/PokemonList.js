import React from "react";
import { connect } from "react-redux";

import { getPokemon } from "../actions";

const PokemonList = props => {
    const getPokemon = e => {
        e.preventDefault();
        props.getPokemon();
    };

    return (
        <div>
            <button onClick={getPokemon}>Get Pokemon</button>
            {props.pokemon.length > 0 &&
                props.pokemon.map(mon => <h2>{mon.name}</h2>)}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        pokemon: state.pokemon
    };
};

export default connect(mapStateToProps, { getPokemon })(PokemonList);
