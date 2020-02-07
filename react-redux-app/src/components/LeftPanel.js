import React from "react";
import styled from "styled-components";

import { Panel, Screen, SpriteControl } from "./StyledComponents";

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
    min-height: 115px;
    box-sizing: border-box;
    flex: 1;
`;

const LeftPanel = () => {
    return (
        <Panel>
            <NameScreen>
                <DexNum />
            </NameScreen>
            <div>
                <img />
                <SpriteControls>
                    <SpriteControl>Female</SpriteControl>
                    <ShinySpriteControl>
                        <span>Shiny</span>
                    </ShinySpriteControl>
                    <SpriteControl>Rotate</SpriteControl>
                </SpriteControls>
            </div>
            <DescriptionScreen></DescriptionScreen>
        </Panel>
    );
};

export default LeftPanel;
