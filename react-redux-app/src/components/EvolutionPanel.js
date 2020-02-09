import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

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

const EvolutionPanel = props => {
    console.log("evolution_line in evolution panel: ", props["evolution_line"]);

    console.log(
        "evolution_sprites in evolution panel: ",
        props["evolution_sprites"]
    );

    return (
        <EvolPanel>
            <div>
                <FlexCenter>
                    <EvolutionNum>I</EvolutionNum>
                </FlexCenter>
                {props["evolution_line"] !== {} && (
                    <>
                        <img
                            src={props["evolution_sprites"]["evol_I"]}
                            alt={props["evolution_line"]["evolution_I"]}
                        />

                        <EvolutionName>
                            {props["evolution_line"]["evolution_I"]}
                        </EvolutionName>
                    </>
                )}
            </div>

            <div>
                <FlexCenter>
                    <EvolutionNum>II</EvolutionNum>
                </FlexCenter>
                {props["evolution_line"]["evolution_II"] && (
                    <>
                        <img
                            src={props["evolution_sprites"]["evol_II"]}
                            alt={props["evolution_line"]["evolution_II"][0]}
                        />

                        <EvolutionName>
                            {props["evolution_line"]["evolution_II"][0]}
                        </EvolutionName>
                    </>
                )}
            </div>

            <div>
                <FlexCenter>
                    <EvolutionNum>III</EvolutionNum>
                </FlexCenter>
                {props["evolution_line"]["evolution_III"] && (
                    <>
                        <img
                            src={props["evolution_sprites"]["evol_III"]}
                            alt={props["evolution_line"]["evolution_III"][0]}
                        />

                        <EvolutionName>
                            {props["evolution_line"]["evolution_III"][0]}
                        </EvolutionName>
                    </>
                )}
            </div>
        </EvolPanel>
    );
};

const mapStateToProps = state => {
    return {
        evolution_line: state["evolution_line"],
        evolution_sprites: state["evolution_sprites"]
    };
};

export default connect(mapStateToProps, {})(EvolutionPanel);
