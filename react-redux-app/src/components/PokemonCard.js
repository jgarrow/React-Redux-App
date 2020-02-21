import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import { typeBg } from "../data/typeBackgrounds";

const Card = styled.div`
    width: 200px;
    margin: 0.5rem 1rem;
    background: #356abc;
    border-radius: 12px;
    box-sizing: border-box;
    padding: 0.5rem;
    text-align: center;
`;

const TypesContainer = styled.div`
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-flow: row wrap;
    justify-content: ${props =>
        props.hasTwoTypes ? "space-between" : "center"};
    align-items: center;
`;

const Type = styled.p`
    padding: 5px 10px;
    border-radius: 12px;
    color: white;
    background: ${props => typeBg[props.bg]};
`;

const PokemonCard = props => {
    const [pokemonInfo, setPokemonInfo] = useState({});
    const [hasTwoTypes, setHasTwoTypes] = useState(false);

    let tempHasTwoTypes = false;

    useEffect(() => {
        let monName = props.pokemon.name;
        axios
            .get(props.pokemonUrl)
            .then(res => {
                const monData = res.data;
                monName = monName.charAt(0).toUpperCase() + monName.slice(1);
                monData.name = monName;
                setPokemonInfo(monData);

                if (res.data.types.length > 1) {
                    tempHasTwoTypes = true;
                }
                setHasTwoTypes(tempHasTwoTypes);
            })
            .catch(err => {
                console.log("There was an error: ", err);
            });
    }, [props.pokemon.name]);

    return (
        <Card>
            {pokemonInfo.name && <h2>{pokemonInfo.name}</h2>}
            {pokemonInfo.sprites && (
                <div>
                    <img
                        src={pokemonInfo.sprites["front_default"]}
                        alt={props.pokemon.name}
                    />
                    <TypesContainer hasTwoTypes={hasTwoTypes}>
                        {pokemonInfo.types.map((type, index) => (
                            <Type key={index} bg={type.type.name}>
                                {type.type.name}
                            </Type>
                        ))}
                    </TypesContainer>
                </div>
            )}
        </Card>
    );
};

export default PokemonCard;
