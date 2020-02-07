import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { Panel, Screen, SpriteControl } from "./StyledComponents";
import {
    IoMdFemale,
    IoIosArrowDropleftCircle,
    IoIosArrowDroprightCircle
} from "react-icons/io";
import { FaUndo } from "react-icons/fa";

const NameScreen = styled(Screen)`
    font-size: 28px;
    letter-spacing: 4px;
    text-transform: capitalize;
    height: 45px;
    box-sizing: border-box;
`;

const DexNum = styled.span`
    float: right;
    text-transform: lowercase;
`;

const ImgWrapper = styled.div`
    width: 359px;
    height: 359px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Sprite = styled.img`
    width: 100%;
    display: flex;
    image-rendering: pixelated;
    border: inset #9aa28b 3px;
    border-radius: 5px;
    margin: 10px 0;
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

const SpriteControls = styled.div`
    display: flex;
    justify-content: space-around;
    font-family: "Staatliches", cursive;
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

const DescriptionScreen = styled(Screen)`
    font-size: 18px;
    letter-spacing: 0;
    width: 100%;
    min-height: 115px;
    max-height: 130px;
    box-sizing: border-box;
    flex: 1;
    position: relative;
    overflow: hidden;
`;

const Slides = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    sgrid-template-columns: ${props => `repeat(${props.numofSlides}, 100%)`};
    transform: ${props => `translateX(${props.translateValue}%)`};
    transition: transform 0.45s ease-out;
`;

const Text = styled.div`
    width: 90%;
    margin: 0 auto;
    text-align: center;
`;

const Arrow = styled.div`
    cursor: pointer;
    height: 18px;
    position: absolute;
    top: calc(50% - 9px);
    left: 5px;
`;

const RightArrow = styled(Arrow)`
    left: unset;
    right: 5px;
`;

// do API call for props.pokemon.species.url, then res.data["flavor_text_entries"] to get the dex description entries array
//  for each element (which are objects), if element.language.name === "en", get the element["flavor_text"] and element.version.name for which game it's from

const LeftPanel = props => {
    console.log("props.pokemon.sprites: ", props.pokemon.sprites);
    // console.log(
    //     "props.pokemon sprite: ",
    //     props.pokemon.sprites["front_default"]
    // );

    const [dexEntryPosition, setDexEntryPosition] = useState(0);

    const handleTransition = direction => {
        let newPosition = dexEntryPosition;

        if (direction === "left") {
            newPosition += 100;
        } else {
            newPosition -= 100;
        }

        setDexEntryPosition(newPosition);
    };

    return (
        <Panel>
            <NameScreen>
                {props.pokemon !== {} && (
                    <>
                        {props.pokemon.name}
                        <DexNum>no. {props.pokemon.order}</DexNum>
                    </>
                )}
            </NameScreen>
            <div>
                <ImgWrapper>
                    {props.pokemon.sprites && (
                        <Sprite
                            src={props.pokemon.sprites["front_default"]}
                            alt={props.pokemon.name}
                        />
                    )}
                </ImgWrapper>
                <SpriteControls>
                    <SpriteControl>
                        <IoMdFemale />
                    </SpriteControl>

                    <ShinySpriteControl>
                        <span>Shiny</span>
                    </ShinySpriteControl>

                    <SpriteControl>
                        <FaUndo />
                    </SpriteControl>
                </SpriteControls>
            </div>
            <DescriptionScreen>
                <Arrow onClick={() => handleTransition("left")}>
                    <IoIosArrowDropleftCircle />
                </Arrow>

                <Slides
                    translateValue={dexEntryPosition}
                    numofSlides={props.dexEntries.length}
                >
                    {props.dexEntries.map((entry, index) => (
                        <Text key={index}>
                            <p>{entry["flavor_text"]}</p>
                        </Text>
                    ))}
                </Slides>

                <RightArrow onClick={() => handleTransition("right")}>
                    <IoIosArrowDroprightCircle />
                </RightArrow>
            </DescriptionScreen>
        </Panel>
    );
};

const mapStateToProps = state => {
    return {
        pokemon: state.pokemon,
        dexEntries: state.dexEntries
    };
};

export default connect(mapStateToProps, {})(LeftPanel);
