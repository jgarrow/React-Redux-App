import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useGetPokemon } from "../hooks/useGetPokemon";

import { getPokemon } from "../actions";

import { PanelRow } from "./StyledComponents";

const Controls = styled(PanelRow)`
    display: flex;
    justify-content: space-around;
    padding: 15px;
    border-top: groove #757575 3px;
    border-bottom: none;
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

    const {
        getInputNum,
        setInputNum: setNum,
        decrementInputNum,
        incrementInputNum,
        getEndpoint
        // retrievePokemon
    } = useGetPokemon();

    const handleChange = e => {
        let newInput = e.target.value;

        if (newInput > 806) {
            newInput = 1;
        } else if (newInput < 1) {
            newInput = 806;
        }

        setInputNum(newInput);
        setNum(newInput);
    };

    const handleBlueButtonPress = direction => {
        let changer = 0;
        let newNum = 0;
        if (direction === "up") {
            changer = 1;
        } else if (direction === "down") {
            changer = -1;
        }

        if (inputNum + changer > 806) {
            newNum = 0;
        } else if (inputNum + changer < 1) {
            newNum = 807;
        } else {
            newNum = inputNum;
        }

        setInputNum(newNum + changer);
    };

    const handleGetPokemon = () => {
        // props.getPokemon(`https://pokeapi.co/api/v2/pokemon/${num}`);
        console.log(getEndpoint());
        props.getPokemon(getEndpoint());
    };

    const handleEnterKeyGetPokemon = e => {
        if (e.key === "Enter") {
            props.getPokemon(`https://pokeapi.co/api/v2/pokemon/${inputNum}`);
        }
    };

    return (
        <Controls>
            <ControlsButton
                // onClick={() => handleBlueButtonPress("down")}
                onClick={() => decrementInputNum()}
            />
            <div>
                <label htmlFor="inputNum" />
                <NumInput
                    id="inputNum"
                    type="number"
                    placeholder="1"
                    value={getInputNum()}
                    onChange={handleChange}
                    onKeyPress={handleEnterKeyGetPokemon}
                />
                <Submit
                    onClick={() => handleGetPokemon()}
                    // onClick={() => retrievePokemon(props.getPokemon)}
                />
            </div>
            <ControlsButton
                // onClick={() => handleBlueButtonPress("up")}
                onClick={() => incrementInputNum()}
            />
        </Controls>
    );
};

const mapStateToProps = state => {
    return {
        pokemon: state.pokemon
    };
};

export default connect(mapStateToProps, { getPokemon })(BottomControls);
