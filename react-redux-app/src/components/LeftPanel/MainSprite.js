import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';

import pokeball from '../../img/PokeballSVG.svg';
import { IoMdFemale } from 'react-icons/io';
import { FaUndo } from 'react-icons/fa';
import { SpriteControl } from '../StyledComponents';

const ImgWrapper = styled.div`
    width: 359px;
    height: 359px;
    display: flex;
    margin: 10px 0;
    position: relative;
    z-index: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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

export const Sprite = styled.img`
    width: 100%;
    display: flex;
    image-rendering: pixelated;
`;

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

const LoadingImage = styled.img`
    width: 200px;
    height: 200px;
    position: relative;
    z-index: 2;
    animation: ${(props) =>
        props.isFetching
            ? css`
                  ${rotate} 2s infinite linear
              `
            : 'none'};
`;

const LoadingText = styled.p`
    margin: 0;
    position: absolute;
    bottom: 45px;
    z-index: 3;
`;

const SpriteControls = styled.div`
    display: flex;
    justify-content: space-around;
    font-family: 'Staatliches', cursive;
    margin-bottom: 10px;
`;

const ShinySpriteControl = styled(SpriteControl)`
    transform: rotate(0);
    background: linear-gradient(
        14deg,
        #bf8823 10%,
        #ffee90 25%,
        #e6a617 47%,
        #ffee90 73%,
        #fff6c8 74%,
        #ffee90 80%
    );
    border-color: #cdb589;
    width: 90px;
    text-shadow: white -1px 1px;

    & > * {
        transform: rotate(0);
    }
`;

const MainSprite = ({ id, sprites, name, isFetching }) => {
    const [isFemale, setIsFemale] = useState(false);
    const [isShiny, setIsShiny] = useState(false);
    const [isBackwards, setIsBackwards] = useState(false);
    const [spriteSrc, setSpriteSrc] = useState('');

    const handleShinyIconClick = (e) => {
        setIsShiny(!isShiny);
    };

    const handleUndoIconClick = (e) => {
        setIsBackwards(!isBackwards);
    };

    const handleFemaleIconClick = (e) => {
        setIsFemale(!isFemale);
    };

    // initialize spriteSrc when sprites changes (which will change when the whole pokemon changes)
    useEffect(() => {
        if (sprites) {
            const defaultSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
            setSpriteSrc(defaultSprite);
        }
    }, [sprites]);

    // for changing image sprite
    useEffect(() => {
        let newSpriteSrc = '';

        if (sprites) {
            if (isFemale && !isShiny && !isBackwards) {
                newSpriteSrc = sprites['front_female'];

                if (newSpriteSrc === null) {
                    newSpriteSrc = newSpriteSrc = sprites['front_default'];
                }
            } else if (isFemale && !isShiny && isBackwards) {
                newSpriteSrc = sprites['back_female'];

                if (newSpriteSrc === null) {
                    newSpriteSrc = newSpriteSrc = sprites['back_default'];
                }
            } else if (isFemale && isShiny && !isBackwards) {
                newSpriteSrc = sprites['front_shiny_female'];

                if (newSpriteSrc === null) {
                    newSpriteSrc = newSpriteSrc = sprites['front_shiny'];
                }
            } else if (isFemale && isShiny && isBackwards) {
                newSpriteSrc = sprites['back_shiny_female'];

                if (newSpriteSrc === null) {
                    newSpriteSrc = newSpriteSrc = sprites['back_shiny_default'];
                }
            } else if (!isFemale && !isShiny && !isBackwards) {
                newSpriteSrc = sprites['front_default']
                    ? sprites['front_default']
                    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png `;
            } else if (!isFemale && !isShiny && isBackwards) {
                newSpriteSrc = sprites['back_default'];
            } else if (!isFemale && isShiny && !isBackwards) {
                newSpriteSrc = sprites['front_shiny'];
            } else if (!isFemale && isShiny && isBackwards) {
                newSpriteSrc = sprites['back_shiny'];
            }
        }

        setSpriteSrc(newSpriteSrc);
    }, [isFemale, isShiny, isBackwards, sprites]);

    return (
        <div>
            <ImgWrapper>
                {sprites && !isFetching ? (
                    <Sprite src={spriteSrc} alt={name} />
                ) : (
                    <LoadingImage
                        src={pokeball}
                        alt="Pokeball displays when loading or no image is available"
                        isFetching={isFetching}
                    />
                )}
                {isFetching && <LoadingText>Loading...</LoadingText>}
            </ImgWrapper>

            <SpriteControls>
                <SpriteControl>
                    <IoMdFemale onClick={handleFemaleIconClick} />
                </SpriteControl>
                <ShinySpriteControl onClick={handleShinyIconClick}>
                    <span>Shiny</span>
                </ShinySpriteControl>

                <SpriteControl>
                    <FaUndo onClick={handleUndoIconClick} />
                </SpriteControl>
            </SpriteControls>
        </div>
    );
};

export default MainSprite;
