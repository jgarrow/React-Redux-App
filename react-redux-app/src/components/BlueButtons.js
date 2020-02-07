import React from "react";
import styled from "styled-components";

import { PanelRow } from "./StyledComponents";

const BlueBtns = styled(PanelRow)`
    flex-wrap: wrap;
    padding: 5px;
`;

const BlueButton = styled.div`
    height: 30px;
    flex: 1 1 16%;
    margin: 3px;
    border: groove #6c96e6 3px;
    border-radius: 5px;
    background: linear-gradient(
        15deg,
        rgba(128, 128, 128, 0.5) 64%,
        rgba(138, 138, 138, 0.5) 70%,
        rgba(230, 230, 230, 0.5) 81%,
        rgba(255, 255, 255, 0.5) 86%,
        rgba(220, 220, 220, 0.5) 89%,
        rgba(230, 230, 230, 0.5) 100%
    );
    background-blend-mode: hard-light;
    background-color: #09a8ff;
`;

const BlueButtons = () => {
    return (
        <BlueBtns>
            <BlueButton />
            <BlueButton />
            <BlueButton />
            <BlueButton />
            <BlueButton />
            <BlueButton />
            <BlueButton />
            <BlueButton />
            <BlueButton />
            <BlueButton />
        </BlueBtns>
    );
};

export default BlueButtons;
