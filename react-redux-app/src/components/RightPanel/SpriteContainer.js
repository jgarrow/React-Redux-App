import React from "react";
import styled from "styled-components";

import { IoMdArrowDropupCircle, IoMdArrowDropdownCircle } from "react-icons/io";

const SmallSprite = styled.img`
    height: 120px;
    width: 120px;
    margin: 3px 0;
    background: transparent;
    image-rendering: pixelated;
    display: flex;
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

const SpriteContainer = ({
    evoNum,
    evolutionLine,
    evolTier,
    evolSpriteTier,
    handleTransition,
    entryPos
}) => {
    return (
        <>
            {evolutionLine !== {} && evolTier && evolTier.length > 0 && (
                <>
                    {evolTier[0] !== "" && evolSpriteTier.length > 1 && (
                        <UpArrowIcon
                            onClick={() =>
                                handleTransition(
                                    evoNum,
                                    "up",
                                    evolSpriteTier.length - 1
                                )
                            }
                        />
                    )}

                    <SpriteSlides
                        translateValue={entryPos}
                        numOfSprites={evolSpriteTier.length}
                    >
                        {evolSpriteTier.map((sprite, index) => {
                            console.log("evolTier.index", evolTier[index]);
                            return (
                                <SmallSprite
                                    key={index}
                                    src={sprite}
                                    alt={evolTier[index]}
                                />
                            );
                        })}
                    </SpriteSlides>

                    {evolTier[0] !== "" && evolSpriteTier.length > 1 && (
                        <DownArrowIcon
                            onClick={() =>
                                handleTransition(
                                    evoNum,
                                    "down",
                                    evolSpriteTier.length - 1
                                )
                            }
                        />
                    )}
                </>
            )}
        </>
    );
};

export default SpriteContainer;
