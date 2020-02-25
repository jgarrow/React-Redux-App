import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { getPokemon, updateInputNum } from "../../actions";

import { PanelRow } from "../StyledComponents";

const BlueBtns = styled(PanelRow)`
    flex-wrap: wrap;
    padding: 5px;
`;

const BlueButton = styled.div`
    height: 30px;
    flex: 1 1 16%;
    margin: 3px;
    cursor: pointer;
    border: groove #6c96e6 3px;
    border-radius: 5px;
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
    background-color: #09a8ff;
    display: flex;
    align-items: center;
    justify-content: center;

    &:active {
        transition: border-width 0.1s ease-out;
        border-width: 4px 3px 1px 3px;
    }
`;

const BlueButtons = props => {
    const getRandomNum = () => {
        const max = 807; // excluding 807
        const randomNum = Math.floor(Math.random() * Math.floor(max));

        props.updateInputNum("new input", randomNum);
        return randomNum;
    };

    const handleGetPokemon = num => {
        const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;

        props.updateInputNum("new input", num);
        props.getPokemon(baseUrl + num);
    };

    return (
        <BlueBtns>
            <BlueButton
                role="button"
                ariaPressed={false}
                onClick={() => handleGetPokemon(props.genApiUrls.gen1)}
            >
                Gen I
            </BlueButton>
            <BlueButton
                role="button"
                ariaPressed={false}
                onClick={() => handleGetPokemon(props.genApiUrls.gen2)}
            >
                Gen II
            </BlueButton>
            <BlueButton
                role="button"
                ariaPressed={false}
                onClick={() => handleGetPokemon(props.genApiUrls.gen3)}
            >
                Gen III
            </BlueButton>
            <BlueButton
                role="button"
                ariaPressed={false}
                onClick={() => handleGetPokemon(props.genApiUrls.gen4)}
            >
                Gen IV
            </BlueButton>
            <BlueButton
                role="button"
                ariaPressed={false}
                onClick={() => handleGetPokemon(props.genApiUrls.gen5)}
            >
                Gen V
            </BlueButton>
            <BlueButton
                role="button"
                ariaPressed={false}
                onClick={() => handleGetPokemon(props.genApiUrls.gen6)}
            >
                Gen VI
            </BlueButton>
            <BlueButton
                role="button"
                ariaPressed={false}
                onClick={() => handleGetPokemon(props.genApiUrls.gen7)}
            >
                Gen VII
            </BlueButton>
            <BlueButton />
            <BlueButton
                role="button"
                ariaPressed={false}
                onClick={() => handleGetPokemon(getRandomNum())}
            >
                Random
            </BlueButton>
            <BlueButton />
        </BlueBtns>
    );
};

const mapStateToProps = state => {
    return {
        genApiUrls: state.genApiUrls,
        inputNum: state.inputNum
    };
};

export default connect(mapStateToProps, { getPokemon, updateInputNum })(
    BlueButtons
);
