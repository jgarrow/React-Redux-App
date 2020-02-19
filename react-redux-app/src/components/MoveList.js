import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { getMoveInfo } from "../actions";

import { Screen } from "./StyledComponents";

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const MoveContainer = styled.div`
    display: flex;
`;

const MoveScreen = styled(Screen)`
    margin: 3px;
    padding: 10px 20px;
    box-sizing: border-box;
    flex: 1;
    width: 100%;
    min-height: 103px;
    max-height: 103px;
    overflow: hidden;
    position: relative;
`;

const Slides = styled.div`
    width: 100%;
    height: 100%;
    min-height: 103px;
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

const MoveStatGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 20px;
`;

const StatLabel = styled.p`
    margin: 0;
`;

const MoveStat = styled.p`
    margin: 0;
    justify-self: flex-end;
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
`;

const MoveList = props => {
    const { pokemon, getMoveInfo, moves } = props;
    const [movePosition, setMovePosition] = useState(0);
    const [entryPosition, setEntryPosition] = useState(0);

    const handleTransition = (direction, numOfSlides) => {
        let newPosition = movePosition;

        if (direction === "up") {
            newPosition += 100;

            // if you try to click "up" past the first image, loop to the "bottom" of the images
            if (newPosition > 0) {
                newPosition = numOfSlides * -100;
            }
        } else if (direction === "down") {
            newPosition -= 100;

            // if you try to click "down" past the total num of images, loop back to the top
            if (newPosition / -100 > numOfSlides) {
                newPosition = 0;
            }
        }

        setMovePosition(newPosition);
    };

    useEffect(() => {
        let tempArray = [];
        if (pokemon.moves) {
            tempArray = [...pokemon.moves];
        }

        if (tempArray !== []) {
            tempArray.forEach(move => {
                getMoveInfo(move.move.url);
            });
        }

        // sort moves by level from lowest to highest
        pokemon.moves &&
            pokemon.moves.sort((a, b) =>
                a["version_group_details"][0]["level_learned_at"] <
                b["version_group_details"][0]["level_learned_at"]
                    ? -1
                    : 1
            );
    }, [pokemon.moves, getMoveInfo]);

    return (
        <MoveContainer>
            <MoveScreen>
                {props.moves && (
                    <Slides
                        translateValue={movePosition}
                        numOfSlides={moves.length}
                    >
                        {moves.map((move, index) => (
                            <MoveInfoContainer key={index}>
                                {move.moveInfo && (
                                    <>
                                        <div>
                                            <MoveName>
                                                {move.moveInfo.name}
                                            </MoveName>
                                            <MoveStatGrid>
                                                <StatLabel>Accuracy</StatLabel>
                                                <MoveStat>
                                                    {move.moveInfo.accuracy}
                                                </MoveStat>
                                                <StatLabel>Power</StatLabel>
                                                <MoveStat>
                                                    {move.moveInfo.power}
                                                </MoveStat>
                                                <StatLabel>PP</StatLabel>
                                                <MoveStat>
                                                    {move.moveInfo.pp}
                                                </MoveStat>
                                            </MoveStatGrid>
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
                <MoveArrow
                    onClick={() => handleTransition("up", moves.length - 1)}
                >
                    <IoIosArrowUp />
                </MoveArrow>
                <MoveArrow
                    onClick={() => handleTransition("down", moves.length - 1)}
                >
                    <IoIosArrowDown />
                </MoveArrow>
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
