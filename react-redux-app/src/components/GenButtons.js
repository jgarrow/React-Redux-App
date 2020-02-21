import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { getPokemon } from "../actions";

const ButtonContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
`;

const Button = styled.p`
    border-radius: 50%;
    cursor: pointer;
    background: #81a4db;
    height: 73px;
    width: 73px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);

    &:hover {
        color: white;
        background: #356abc;
        box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.25);
    }
`;

const GenButtons = props => {
    const handleGetNewGen = apiUrl => {
        props.getPokemon(apiUrl);
    };

    return (
        <ButtonContainer>
            <Button onClick={() => handleGetNewGen(props.genApiUrls["gen1"])}>
                Gen I
            </Button>
            <Button onClick={() => handleGetNewGen(props.genApiUrls["gen2"])}>
                Gen II
            </Button>
            <Button onClick={() => handleGetNewGen(props.genApiUrls["gen3"])}>
                Gen III
            </Button>
            <Button onClick={() => handleGetNewGen(props.genApiUrls["gen4"])}>
                Gen IV
            </Button>
            <Button onClick={() => handleGetNewGen(props.genApiUrls["gen5"])}>
                Gen V
            </Button>
            <Button onClick={() => handleGetNewGen(props.genApiUrls["gen6"])}>
                Gen VI
            </Button>
            <Button onClick={() => handleGetNewGen(props.genApiUrls["gen7"])}>
                Gen VII
            </Button>
        </ButtonContainer>
    );
};

const mapStateToProps = state => {
    return {
        genApiUrls: state.genApiUrls
    };
};

export default connect(mapStateToProps, { getPokemon })(GenButtons);
