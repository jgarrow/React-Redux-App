import React from "react";
import styled from "styled-components";

import { Panel, PanelRow } from "../StyledComponents";
import StatsScreen from "./StatsScreen";
import Types from "./Types";
import EvolutionPanel from "./EvolutionPanel";
import BlueButtons from "./BlueButtons";
import MoveList from "./MoveList";
import BottomControls from "./BottomControls";

const RghtPanel = styled(Panel)`
    padding: 0;
    width: 379px;
`;

const RightPanel = () => {
    return (
        <RghtPanel>
            <PanelRow>
                <StatsScreen />
                <Types />
            </PanelRow>
            <EvolutionPanel />
            <BlueButtons />
            <MoveList />
            <BottomControls />
        </RghtPanel>
    );
};

export default RightPanel;
