import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { PanelRow, Screen } from "./StyledComponents";
import { Sprite } from "./LeftPanel";

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
    margin: 0;
`;

const EvolutionName = styled(Screen)`
    width: auto;
    padding: 3px;
    margin-bottom: 3px;
    text-align: right;
`;

const SmallSprite = styled(Sprite)`
    height: 120px;
    width: 120px;
    margin: 3px 0;
`;

const EvolutionPanel = props => {
    // console.log("evolution_line in evolution panel: ", props["evolution_line"]);

    // console.log(
    //     "evolution_sprites in evolution panel: ",
    //     props["evolution_sprites"]
    // );

    return (
        <EvolPanel>
            <div>
                <FlexCenter>
                    <EvolutionNum>I</EvolutionNum>
                </FlexCenter>
                {props["evolution_line"] !== {} && (
                    <>
                        <SmallSprite
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
                        <SmallSprite
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
                        <SmallSprite
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

export default connect(mapStateToProps, {}, null, {
    areStatesEqual: (next, prev) => {
        // console.log('prev["evolution_line"]: ', prev["evolution_line"]);
        // console.log('next["evolution_line"]: ', next["evolution_line"]);

        // console.log('prev["evolution_sprites"]: ', prev["evolution_sprites"]);
        // console.log('next["evolution_sprites"]: ', next["evolution_sprites"]);

        return (
            prev["evolution_line"] === next["evolution_line"] &&
            prev["evolution_sprites"] === next["evolution_sprites"]
        );
    }
})(EvolutionPanel);
