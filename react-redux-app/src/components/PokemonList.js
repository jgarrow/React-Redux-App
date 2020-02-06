import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { getPokemon } from "../actions";

import PokemonCard from "./PokemonCard";

const CardContainer = styled.div`
    width: 80%;
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    align-items: center;
`;

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: ${props =>
        props.previousExists ? "space-between" : "flex-end"};
    align-items: center;
    margin-top: 1rem;
`;

const Button = styled.button`
    font-size: 1rem;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 5px 10px;
    background: #81a4db;
    cursor: pointer;
    color: black;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);

    &:hover {
        color: white;
        background: #356abc;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.25);
    }
`;

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
        <CardContainer>
            {props.pokemon.length > 0 ? (
                props.pokemon.map((mon, index) => (
                    <PokemonCard
                        key={index}
                        pokemon={mon}
                        pokemonUrl={mon.url}
                    />
                ))
            ) : (
                <Button
                    onClick={e =>
                        handleGetPokemon(e, "https://pokeapi.co/api/v2/pokemon")
                    }
                >
                    Get Pokemon
                </Button>
            )}
            <ButtonContainer previousExists={props.previous}>
                {props.previous && (
                    <Button onClick={e => handleGetPokemon(e, props.previous)}>
                        Previous
                    </Button>
                )}
                {props.next && (
                    <Button onClick={e => handleGetPokemon(e, props.next)}>
                        Next
                    </Button>
                )}
            </ButtonContainer>
        </CardContainer>
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
