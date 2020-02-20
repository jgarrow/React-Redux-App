import React, { useState } from "react";
import styled from "styled-components";

import { Screen } from "../StyledComponents";
import {
    IoIosArrowDropleftCircle,
    IoIosArrowDroprightCircle
} from "react-icons/io";

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
    grid-template-columns: ${props => `repeat(${props.numOfSlides}, 100%)`};
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
    z-index: 5;
`;

const RightArrow = styled(Arrow)`
    left: unset;
    right: 5px;
`;

const DexEntries = ({ dexEntries }) => {
    const [dexEntryPosition, setDexEntryPosition] = useState(0);

    // for slides transitioning for dex entries
    const handleTransition = (direction, numSlides) => {
        let newPosition = dexEntryPosition;

        if (direction === "left") {
            newPosition += 100;

            // if you try to click "left" past the total num of images, loop back to the end
            if (newPosition > 0) {
                newPosition = numSlides * -100;
            }
        } else if (direction === "right") {
            newPosition -= 100;

            // if you try to click "right" past the first image, loop to the beginning
            if (newPosition / -100 > numSlides) {
                newPosition = 0;
            }
        }

        setDexEntryPosition(newPosition);
    };

    console.log("dexEntries in DexEntries: ", dexEntries);

    return (
        <DescriptionScreen>
            {dexEntries.length && (
                <>
                    <Arrow
                        onClick={() =>
                            handleTransition("left", dexEntries.length - 1)
                        }
                    >
                        <IoIosArrowDropleftCircle />
                    </Arrow>

                    <Slides
                        translateValue={dexEntryPosition}
                        numOfSlides={dexEntries.length}
                    >
                        {dexEntries.length
                            ? dexEntries.map((entry, index) => (
                                  <Text key={index}>
                                      <p>
                                          {entry["flavor_text"]
                                              ? entry["flavor_text"]
                                              : ""}
                                      </p>
                                  </Text>
                              ))
                            : ""}
                    </Slides>

                    <RightArrow
                        onClick={() =>
                            handleTransition("right", dexEntries.length - 1)
                        }
                    >
                        <IoIosArrowDroprightCircle />
                    </RightArrow>
                </>
            )}
        </DescriptionScreen>
    );
};

export default DexEntries;
