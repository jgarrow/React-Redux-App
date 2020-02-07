import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const TypesContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-left: groove #757575 3px;
    flex: 1;
`;

const PanelHeader = styled.div`
    text-transform: capitalize;
    font-size: 1.25em;
    padding: 5px;
    font-family: "Staatliches", cursive;
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
        14deg,
        #460f0f 0,
        #891313 30%,
        #b31818 45%,
        #fd5555 65%,
        #b31818 95%
    );
    border: groove #e61515 3px;
    border-width: 3px 2px;
    text-shadow: #fd5555 -1px 1px;
`;

const TypesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-evenly;
    background: linear-gradient(14deg, #afafaf 50%, #ffffff 80%, #afafaf 90%);
    border-top: groove #757575 3px;
`;

const Type = styled.div`
    color: rgba(0, 0, 0, 0.9);
    text-transform: capitalize;
    font-size: 1.25em;
    padding: 2px;
    margin: 2px;
    border: groove #757575 3px;
    border-radius: 10px;
    width: 150px;
    font-family: "Staatliches", cursive;
    text-align: center;
    letter-spacing: 2px;
    text-shadow: rgba(255, 255, 255, 0.3) -1px 1px;
    align-self: center;
    background: linear-gradient(
        15deg,
        rgba(128, 128, 128, 0.5) 64%,
        rgba(138, 138, 138, 0.5) 70%,
        rgba(230, 230, 230, 0.5) 81%,
        rgba(255, 255, 255, 0.5) 86%,
        rgba(220, 220, 220, 0.5) 89%,
        rgba(230, 230, 230, 0.5) 100%
    );
    background-blend-mode: hard-light;
`;

const Types = props => {
    return (
        <TypesContainer>
            <PanelHeader>Types</PanelHeader>
            <TypesWrapper>
                {props.pokemon.types &&
                    props.pokemon.types.map((type, index) => (
                        <Type key={index}>{type.type.name}</Type>
                    ))}
            </TypesWrapper>
        </TypesContainer>
    );
};

const mapStateToProps = state => {
    return {
        pokemon: state.pokemon
    };
};

export default connect(mapStateToProps, {})(Types);
