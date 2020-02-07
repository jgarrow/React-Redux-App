import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { getPokemon } from "../actions";

const Controls = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 15px;
`;

const ControlsButton = styled.div`
    padding: 5px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: outset rgb(248, 187, 187) 6px;
    transform: rotate(60deg);
    background: radial-gradient(
        circle farthest-corner at 40% 25%,
        rgb(218, 237, 241) 9%,
        rgb(124, 214, 237) 20%,
        rgb(64, 90, 165) 62%,
        rgb(43, 125, 196) 100%
    );
    cursor: pointer;

    &:after {
        border: groove #460f0f 5px;
        content: "";
        width: 60px;
        height: 60px;
        position: absolute;
        border-radius: 50%;
        left: -10px;
        top: -10px;
        border-style: double;
        opacity: 0.75;
    }
`;

const NumInput = styled.input`
    width: 50px;
    font-size: 20px;
    height: 30px;
    text-align: right;
    align-self: center;
    background: linear-gradient(
        14deg,
        rgb(165, 205, 83) 60%,
        rgb(193, 217, 144) 65%
    );
    padding: 5px;
    border-radius: 3px;
    font-family: "VT323";
    border: inset #879a65 3px;
`;

const Submit = styled.div`
    width: 66px;
    height: 18px;
    border: groove #5f845e 3px;
    background-color: #5ed75e;
    border-radius: 20px;
    box-sizing: border-box;
    margin-top: 3px;
    cursor: pointer;
`;

const BottomControls = props => {
    const [inputNum, setInputNum] = useState(1);

    const handleChange = e => {
        setInputNum(e.target.value);
    };

    const handleGetPokemon = num => {
        props.getPokemon(`https://pokeapi.co/api/v2/pokemon/${num}`);
    };

    return (
        <Controls>
            <ControlsButton />
            <div>
                <label htmlFor="inputNum" />
                <NumInput
                    id="inputNum"
                    type="number"
                    placeholder="1"
                    value={inputNum}
                    onChange={handleChange}
                />
                <Submit onClick={() => handleGetPokemon(inputNum)} />
            </div>
            <ControlsButton />
        </Controls>
    );
};

const mapStateToProps = state => {
    return {
        pokemon: state.pokemon
    };
};

export default connect(mapStateToProps, { getPokemon })(BottomControls);
