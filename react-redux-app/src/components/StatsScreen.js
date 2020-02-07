import React from "react";
import styled from "styled-components";

import { Screen } from "./StyledComponents";

const StatScreen = styled(Screen)`
    width: 150px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 5px;
    flex: 1;
`;

const StatLine = styled.p`
    font-size: 17px;
    text-transform: capitalize;
`;

const StatsScreen = () => {
    return (
        <StatScreen>
            <StatLine>Speed</StatLine>
            <StatLine>Special Attack</StatLine>
            <StatLine>Special Defense</StatLine>
            <StatLine>Attack</StatLine>
            <StatLine>Defense</StatLine>
            <StatLine>HP</StatLine>
        </StatScreen>
    );
};

export default StatsScreen;
