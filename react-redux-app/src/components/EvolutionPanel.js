import React, { useState, useEffect } from "react";
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

const SpriteScreen = styled.div`
    width: 100%;
    min-width: 120px;
    max-width: 120px;
    position: relative;
    overflow: hidden;
    min-height: 120px;
    max-height: 120px;
    margin: 3px 0;
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

const NameScreen = styled(Screen)`
    padding: 3px;
    box-sizing: border-box;
    margin-bottom: 3px;
    text-align: right;
    height: 28px;
    width: 120px;
    overflow: hidden;
`;

const NameSlides = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 28px;
    max-height: 28px;
    display: grid;
    grid-template-rows: ${props => `repeat(${props.numOfNames}, 100%)`};
    transform: ${props => `translateY(${props.translateValue}%)`};
    transition: transform 0.45s ease-out;
`;

const EvolutionName = styled.p`
    margin: 0;
`;

const EvolutionPanel = props => {
    const [spriteIIEntryPosition, setSpriteIIEntryPosition] = useState(0);
    const [spriteIIIEntryPosition, setSpriteIIIEntryPosition] = useState(0);
    const [evoIName, setEvoIName] = useState("");

    // to capitalize first letter of tier I evolution's name
    useEffect(() => {
        let name = evoIName;
        if (props["evolution_line"]["evolution_I"]) {
            name = props["evolution_line"]["evolution_I"];
        }

        if (evoIName && evoIName !== "") {
            name = name.charAt(0).toUpperCase() + name.slice(1);
        }

        setEvoIName(name);
    }, [props, evoIName]);

    const handleTransition = (evolTier, direction, numOfSlides) => {
        let newPosition = 0;
        let entryPositionState = "";

        if (evolTier === "II") {
            newPosition = spriteIIEntryPosition;
            entryPositionState = evolTier;
        } else if (evolTier === "III") {
            newPosition = spriteIIIEntryPosition;
            entryPositionState = evolTier;
        }

        if (direction === "down") {
            newPosition -= 100;

            // if you try to click "down" past the total num of images, loop back to the top
            if (newPosition / -100 > numOfSlides) {
                newPosition = 0;
            }
        } else if (direction === "up") {
            newPosition += 100;

            // if you try to click "up" past the first image, loop to the "bottom" of the images
            if (newPosition > 0) {
                newPosition = numOfSlides * -100;
            }
        }

        if (entryPositionState === "II") {
            setSpriteIIEntryPosition(newPosition);
        } else if (entryPositionState === "III") {
            setSpriteIIIEntryPosition(newPosition);
        }
    };

    return (
        <EvolPanel>
            <div>
                <FlexCenter>
                    <EvolutionNum>I</EvolutionNum>
                </FlexCenter>
                <SpriteScreen>
                    {props["evolution_line"] !== {} && (
                        <SmallSprite
                            src={props["evolution_sprites"]["evol_I"]}
                            alt={props["evolution_line"]["evolution_I"]}
                        />
                    )}
                </SpriteScreen>
                <NameScreen>
                    {props["evolution_line"] !== {} && (
                        <EvolutionName>{evoIName}</EvolutionName>
                    )}
                </NameScreen>
            </div>

            <div>
                <FlexCenter>
                    <EvolutionNum>II</EvolutionNum>
                </FlexCenter>
                <SpriteScreen>
                    {props["evolution_line"]["evolution_II"] && (
                        <>
                            {props["evolution_line"]["evolution_II"][0] !==
                                "" &&
                                props["evolution_line"]["evolution_II"].length >
                                    1 && (
                                    <UpArrowIcon
                                        onClick={() =>
                                            handleTransition(
                                                "II",
                                                "up",
                                                props["evolution_sprites"][
                                                    "evol_II"
                                                ].length - 1
                                            )
                                        }
                                    />
                                )}
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
                            {props["evolution_line"]["evolution_II"][0] !==
                                "" &&
                                props["evolution_line"]["evolution_II"].length >
                                    1 && (
                                    <DownArrowIcon
                                        onClick={() =>
                                            handleTransition(
                                                "II",
                                                "down",
                                                props["evolution_sprites"][
                                                    "evol_II"
                                                ].length - 1
                                            )
                                        }
                                    />
                                )}
                        </>
                    )}
                </SpriteScreen>
                <NameScreen>
                    {props["evolution_line"]["evolution_II"] &&
                        props["evolution_line"]["evolution_II"].map(
                            (name, index) => {
                                name =
                                    name.charAt(0).toUpperCase() +
                                    name.slice(1);
                                return (
                                    <NameSlides
                                        key={index}
                                        numOfNames={
                                            props["evolution_line"][
                                                "evolution_II"
                                            ].length
                                        }
                                        translateValue={spriteIIEntryPosition}
                                    >
                                        <EvolutionName>{name}</EvolutionName>
                                    </NameSlides>
                                );
                            }
                        )}
                </NameScreen>
            </div>

            <div>
                <FlexCenter>
                    <EvolutionNum>III</EvolutionNum>
                </FlexCenter>
                <SpriteScreen>
                    {props["evolution_line"]["evolution_III"] && (
                        <>
                            {props["evolution_line"]["evolution_III"][0] !==
                                "" &&
                                props["evolution_line"]["evolution_III"]
                                    .length > 1 && (
                                    <UpArrowIcon
                                        onClick={() =>
                                            handleTransition(
                                                "III",
                                                "up",
                                                props["evolution_sprites"][
                                                    "evol_III"
                                                ].length - 1
                                            )
                                        }
                                    />
                                )}
                            <SpriteSlides
                                translateValue={spriteIIIEntryPosition}
                                numOfSprites={
                                    props["evolution_sprites"]["evol_III"]
                                        .length
                                }
                            >
                                {props["evolution_sprites"]["evol_III"].map(
                                    (sprite, index) => (
                                        <SmallSprite
                                            key={index}
                                            src={sprite}
                                            alt={
                                                props["evolution_line"][
                                                    "evolution_III"
                                                ][index]
                                            }
                                        />
                                    )
                                )}
                            </SpriteSlides>

                            {props["evolution_line"]["evolution_III"][0] !==
                                "" &&
                                props["evolution_line"]["evolution_III"]
                                    .length > 1 && (
                                    <DownArrowIcon
                                        onClick={() =>
                                            handleTransition(
                                                "III",
                                                "down",
                                                props["evolution_sprites"][
                                                    "evol_III"
                                                ].length - 1
                                            )
                                        }
                                    />
                                )}
                        </>
                    )}
                </SpriteScreen>

                <NameScreen>
                    {props["evolution_line"]["evolution_III"] &&
                        props["evolution_line"]["evolution_III"].map(
                            (name, index) => {
                                name =
                                    name.charAt(0).toUpperCase() +
                                    name.slice(1);
                                return (
                                    <NameSlides
                                        key={index}
                                        numOfNames={
                                            props["evolution_line"][
                                                "evolution_III"
                                            ].length
                                        }
                                        translateValue={spriteIIIEntryPosition}
                                    >
                                        <EvolutionName>{name}</EvolutionName>
                                    </NameSlides>
                                );
                            }
                        )}
                </NameScreen>
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
