import React from "react";
import styled from "styled-components";

import { PanelRow, Screen } from "./StyledComponents";

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
`;

const EvolutionName = styled(Screen)`
    width: auto;
    padding: 3px;
    margin-bottom: 3px;
    text-align: right;
`;

const EvolutionPanel = () => {
    return (
        <EvolPanel>
            <div>
                <FlexCenter>
                    <EvolutionNum>I</EvolutionNum>
                </FlexCenter>
                <img />
                <EvolutionName></EvolutionName>
            </div>

            <div>
                <FlexCenter>
                    <EvolutionNum>II</EvolutionNum>
                </FlexCenter>
                <img />
                <EvolutionName></EvolutionName>
            </div>

            <div>
                <FlexCenter>
                    <EvolutionNum>III</EvolutionNum>
                </FlexCenter>
                <img />
                <EvolutionName></EvolutionName>
            </div>
        </EvolPanel>
    );
};

export default EvolutionPanel;
