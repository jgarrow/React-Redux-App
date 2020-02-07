import React from "react";
import styled from "styled-components";

import { Screen } from "./StyledComponents";

const MoveContainer = styled.div`
    display: flex;
`;

const MoveScreen = styled(Screen)`
    margin: 3px;
    padding: 10px 20px;
    flex: 1;
    display: flex;
    justify-content: space-between;
`;

const MoveName = styled.div`
    font-size: 24px;
    border-bottom: solid black 2px;
    padding: 0 5px;
    margin-bottom: 3px;
    text-align: center;
    text-transform: capitalize;
`;

const MoveType = styled.div`
    font-size: 18px;
    text-transform: uppercase;
    border: solid black 2px;
    border-radius: 7px;
    padding: 2px 10px;
    text-align: center;
`;

const MoveLearn = styled.div`
    font-size: 20px;
    float: right;
    margin-right: 3px;
`;

const MoveControls = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 0 10px 0 7px;
`;

const MoveArrow = styled.div`
    height: 40px;
    width: 40px;
    font-size: 37px;
    border: groove grey 3px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: #e78181 -1px 1px;
    cursor: pointer;
    transform: rotate(60deg);
`;

const MoveList = () => {
    return (
        <MoveContainer>
            <MoveScreen>
                <div>
                    <MoveName></MoveName>
                    <p>Accuracy</p>
                    <p>Power</p>
                    <p>PP</p>
                </div>

                <div>
                    <MoveType>TYPE: </MoveType>
                    <MoveLearn>Learn: Lvl</MoveLearn>
                </div>
            </MoveScreen>

            <MoveControls>
                <MoveArrow></MoveArrow>
                <MoveArrow></MoveArrow>
            </MoveControls>
        </MoveContainer>
    );
};

export default MoveList;
