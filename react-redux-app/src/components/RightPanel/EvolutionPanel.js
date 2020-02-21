import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { PanelRow, Screen } from "../StyledComponents";
import SpriteContainer from "./SpriteContainer";
import EvolutionNameScreen from "./EvolutionNameScreen";

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

const NameScreen = styled(Screen)`
    padding: 3px;
    box-sizing: border-box;
    margin-bottom: 3px;
    text-align: right;
    height: 28px;
    width: 120px;
    overflow: hidden;
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
                    {props["evolution_sprites"]["evol_I"] && (
                        <SpriteContainer
                            evoNum="I"
                            evolutionLine={props["evolution_line"]}
                            evolTier={[props["evolution_line"]["evolution_I"]]}
                            evolSpriteTier={
                                props["evolution_sprites"]["evol_I"]
                            }
                        />
                    )}
                </SpriteScreen>
                <NameScreen>
                    {props["evolution_line"]["evolution_I"] && (
                        <EvolutionNameScreen
                            evolTier={[props["evolution_line"]["evolution_I"]]}
                        />
                    )}
                </NameScreen>
            </div>

            <div>
                <FlexCenter>
                    <EvolutionNum>II</EvolutionNum>
                </FlexCenter>
                <SpriteScreen>
                    {props["evolution_sprites"]["evol_II"] &&
                        props["evolution_sprites"]["evol_II"] !== [] && (
                            <SpriteContainer
                                evoNum="II"
                                evolutionLine={props["evolution_line"]}
                                evolTier={
                                    props["evolution_line"]["evolution_II"]
                                }
                                evolSpriteTier={
                                    props["evolution_sprites"]["evol_II"]
                                }
                                handleTransition={handleTransition}
                                entryPos={spriteIIEntryPosition}
                            />
                        )}
                </SpriteScreen>
                <NameScreen>
                    <EvolutionNameScreen
                        evolTier={props["evolution_line"]["evolution_II"]}
                        entryPos={spriteIIEntryPosition}
                    />
                </NameScreen>
            </div>

            <div>
                <FlexCenter>
                    <EvolutionNum>III</EvolutionNum>
                </FlexCenter>
                <SpriteScreen>
                    {props["evolution_sprites"]["evol_III"] &&
                        props["evolution_sprites"]["evol_III"] !== [] && (
                            <SpriteContainer
                                evoNum="III"
                                evolutionLine={props["evolution_line"]}
                                evolTier={
                                    props["evolution_line"]["evolution_III"]
                                }
                                evolSpriteTier={
                                    props["evolution_sprites"]["evol_III"]
                                }
                                handleTransition={handleTransition}
                                entryPos={spriteIIIEntryPosition}
                            />
                        )}
                </SpriteScreen>
                <NameScreen>
                    <EvolutionNameScreen
                        evolTier={props["evolution_line"]["evolution_III"]}
                        entryPos={spriteIIIEntryPosition}
                    />
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
