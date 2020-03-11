import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import pokeball from "../../img/PokeballSVG.svg";
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

const AltImgContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AltImage = styled.img`
    width: 80px;
    height: 80px;
`;

const SpriteContainer = ({
    evoNum,
    evolutionLine,
    evolTier,
    evolSpriteTier,
    handleTransition,
    entryPos,
    // ...props
    isFetching
}) => {
    const [isLoading, setIsLoading] = useState(isFetching);

    // console.log(`evolSpriteTier for ${evoNum}: `, evolSpriteTier);
    // console.log("isFetching in SpriteContainer: ", isFetching);
    // console.log(`evolTier for ${evoNum}: `, evolTier);
    // console.log(`evolutionLine for ${evoNum}: `, evolutionLine);

    useEffect(() => {
        console.log("isFetching in SpriteContainer: ", isFetching);
        setIsLoading(isFetching);
    }, [isFetching]);

    console.log("evolSpriteTier: ", evolSpriteTier);

    return (
        <>
            {!isFetching && (
                <>
                    {evolSpriteTier && evolSpriteTier.length > 0 ? (
                        <>
                            {evolTier[0] !== "" &&
                                evolSpriteTier.length > 1 && (
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
                                    return (
                                        <SmallSprite
                                            key={index}
                                            src={sprite}
                                            alt={evolTier[index]}
                                        />
                                    );
                                })}
                            </SpriteSlides>

                            {evolTier[0] !== "" &&
                                evolSpriteTier.length > 1 && (
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
                    ) : (
                        <AltImgContainer>
                            <AltImage
                                src={pokeball}
                                alt="Pokeball displays when no image is available or the displayed pokemon doesn't evolve"
                            />
                        </AltImgContainer>
                    )}
                </>
            )}
        </>
    );
};

const mapStateToProps = state => {
    return {
        isFetching: state.isFetching
    };
};

export default connect(mapStateToProps, {})(SpriteContainer);
