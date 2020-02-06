import React, { useState, useEffect } from "react";
import axios from "axios";

const PokemonCard = props => {
    const [pokemonInfo, setPokemonInfo] = useState({
        dexNum: null,
        types: [],
        sprites: {}
    });

    useEffect(() => {
        axios
            .get(props.pokemonUrl)
            .then(res => {
                // console.log("res: ", res);
                setPokemonInfo(res.data);
            })
            .catch(err => {
                console.log("There was an error: ", err);
            });
    }, [props.pokemon.name]);

    return (
        <div>
            <h2>{props.pokemon.name}</h2>
            {pokemonInfo.sprites && (
                <div>
                    <img
                        src={pokemonInfo.sprites["front_default"]}
                        alt={props.pokemon.name}
                    />
                    {pokemonInfo.types.map((type, index) => (
                        <p key={index}>{type.type.name}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PokemonCard;
