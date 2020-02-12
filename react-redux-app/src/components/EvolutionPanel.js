import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { PanelRow, Screen } from "./StyledComponents";

import { IoMdArrowDropupCircle, IoMdArrowDropdownCircle } from "react-icons/io";

const EvolPanel = styled(PanelRow)`
    flex-wrap: wrap;
`;

const FlexCenter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const EvolutionNum = styled.p`
    font-family: "Staatliches", cursive;
    font-size: 1.25em;
    letter-spacing: 2px;
    background: transparent;
    border: none;
    text-shadow: #e78181 -1px 1px;
    margin: 0;
`;

const EvolutionName = styled(Screen)`
    width: auto;
    padding: 3px;
    margin-bottom: 3px;
    text-align: right;
`;

const SpriteScreen = styled.div`
    width: 100%;
    position: relative;
    overflow: hidden;
    min-height: 120px;
    max-height: 120px;
    border: inset #9aa28b 3px;
    border-radius: 5px;
    box-sizing: border-box;
    background: linear-gradient(
        15deg,
        #cad5b5 64%,
        #dde2d4 70%,
        #dde2d4 81%,
        #fff 86%,
        #dde2d4 89%,
        #dde2d4 100%
    );
`;

const UpArrowIcon = styled(IoMdArrowDropupCircle)`
    cursor: pointer;
    position: absolute;
    top: 2px;
    left: 50px;
    z-index: 5;
`;

const DownArrowIcon = styled(IoMdArrowDropdownCircle)`
    cursor: pointer;
    position: absolute;
    bottom: 0;
    left: 50px;
    z-index: 5;
`;

const SpriteSlides = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 120px;
    max-height: 120px;
    display: grid;
    grid-template-rows: ${props => `repeat(${props.numOfSprites}, 100%)`};
    transform: ${props => `translateY(${props.translateValue}%)`};
    transition: transform 0.45s ease-out;
`;

const SmallSprite = styled.img`
    height: 120px;
    width: 120px;
    margin: 3px 0;
    background: transparent;
    image-rendering: pixelated;
    display: flex;
`;

const EvolutionPanel = props => {
    const [spriteIIEntryPosition, setSpriteIIEntryPosition] = useState(0);

    const handleTransition = (evolTier, direction) => {
        let newPosition = null;
        let entryPositionState = null;

        console.log("in handleTransition");

        if (evolTier === "II") {
            newPosition = spriteIIEntryPosition;
            entryPositionState = spriteIIEntryPosition;
        }

        if (direction === "down") {
            newPosition -= 100;
        } else {
            newPosition += 100;
        }

        if (entryPositionState === spriteIIEntryPosition) {
            setSpriteIIEntryPosition(newPosition);
        }
    };

    return (
        <EvolPanel>
            <div>
                <FlexCenter>
                    <EvolutionNum>I</EvolutionNum>
                </FlexCenter>
                {props["evolution_line"] !== {} && (
                    <>
                        <SmallSprite
                            src={props["evolution_sprites"]["evol_I"]}
                            alt={props["evolution_line"]["evolution_I"]}
                        />

                        <EvolutionName>
                            {props["evolution_line"]["evolution_I"]}
                        </EvolutionName>
                    </>
                )}
            </div>

            <div>
                <FlexCenter>
                    <EvolutionNum>II</EvolutionNum>
                </FlexCenter>
                <SpriteScreen>
                    {props["evolution_line"]["evolution_II"] && (
                        <>
                            <UpArrowIcon
                                onClick={() => handleTransition("II", "up")}
                            />
                            <SpriteSlides
                                translateValue={spriteIIEntryPosition}
                                numOfSprites={
                                    props["evolution_sprites"]["evol_II"].length
                                }
                            >
                                {props["evolution_sprites"]["evol_II"].map(
                                    (sprite, index) => (
                                        <SmallSprite
                                            key={index}
                                            src={sprite}
                                            alt={
                                                props["evolution_line"][
                                                    "evolution_II"
                                                ][index]
                                            }
                                        />
                                    )
                                )}
                            </SpriteSlides>
                            <DownArrowIcon
                                onClick={() => handleTransition("II", "down")}
                            />
                            <EvolutionName>
                                {props["evolution_line"]["evolution_II"][0]}
                            </EvolutionName>
                        </>
                    )}
                </SpriteScreen>
            </div>

            <div>
                <FlexCenter>
                    <EvolutionNum>III</EvolutionNum>
                </FlexCenter>
                {props["evolution_line"]["evolution_III"] && (
                    <>
                        <SmallSprite
                            src={props["evolution_sprites"]["evol_III"][0]}
                            alt={props["evolution_line"]["evolution_III"][0]}
                        />

                        <EvolutionName>
                            {props["evolution_line"]["evolution_III"][0]}
                        </EvolutionName>
                    </>
                )}
            </div>
        </EvolPanel>
    );
};

const mapStateToProps = state => {
    return {
        evolution_line: state["evolution_line"],
        evolution_sprites: state["evolution_sprites"]
    };
};

export default connect(mapStateToProps, {})(EvolutionPanel);
