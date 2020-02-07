import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { getMoveInfo } from "../actions";

import { Screen } from "./StyledComponents";

const MoveContainer = styled.div`
    display: flex;
    min-height: 158px;
`;

const MoveScreen = styled(Screen)`
    margin: 3px;
    padding: 10px 20px;
    box-sizing: border-box;
    flex: 1;
    width: 100%;
    min-height: 135px;
    max-height: 135px;
    overflow: hidden;
    position: relative;
`;

const Slides = styled.div`
    width: 100%;
    height: 100%;
    min-height: 135px;
    position: relative;
    display: grid;
    grid-template-rows: ${props => `repeat(${props.numOfSlides}, 100%)`};
    transform: ${props => `translateY(${props.translateValue}%)`};
    transition: transform 0.45s ease-out;
`;

const MoveInfoContainer = styled.div`
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

const MoveStat = styled.p`
    margin: 0;
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

const MoveList = props => {
    const [movePosition, setMovePosition] = useState(0);

    const handleTransition = direction => {
        let newPosition = movePosition;

        if (direction === "up") {
            newPosition += 100;
        } else {
            newPosition -= 100;
        }

        setMovePosition(newPosition);
    };

    useEffect(() => {
        let tempArray = [];
        if (props.pokemon.moves) {
            tempArray = [...props.pokemon.moves];
        }

        console.log("tempArray: ", tempArray);

        if (tempArray !== []) {
            tempArray.forEach(move => {
                console.log("move info url: ", move.move.url);
                props.getMoveInfo(move.move.url);
            });
        }
    }, [props.pokemon.moves]);

    return (
        <MoveContainer>
            <MoveScreen>
                {props.moves && (
                    <Slides
                        translateValue={movePosition}
                        numOfSlides={props.moves.length}
                    >
                        {props.moves.map((move, index) => (
                            <MoveInfoContainer key={index}>
                                {move.moveInfo && (
                                    <>
                                        <div>
                                            <MoveName>
                                                {move.moveInfo.name}
                                            </MoveName>
                                            <MoveStat>
                                                Accuracy:{" "}
                                                {move.moveInfo.accuracy}
                                            </MoveStat>
                                            <MoveStat>
                                                Power: {move.moveInfo.power}
                                            </MoveStat>
                                            <MoveStat>
                                                PP: {move.moveInfo.pp}
                                            </MoveStat>
                                        </div>

                                        <div>
                                            <MoveType>
                                                TYPE: {move.moveInfo.type.name}
                                            </MoveType>
                                            <MoveLearn>
                                                Learn: Lvl{" "}
                                                {
                                                    move[
                                                        "version_group_details"
                                                    ][0]["level_learned_at"]
                                                }
                                            </MoveLearn>
                                        </div>
                                    </>
                                )}
                            </MoveInfoContainer>
                        ))}
                    </Slides>
                )}
            </MoveScreen>

            <MoveControls>
                <MoveArrow onClick={() => handleTransition("up")}></MoveArrow>
                <MoveArrow onClick={() => handleTransition("down")}></MoveArrow>
            </MoveControls>
        </MoveContainer>
    );
};

const mapStateToProps = state => {
    return {
        pokemon: state.pokemon,
        moves: state.moves
    };
};

export default connect(mapStateToProps, { getMoveInfo })(MoveList);
