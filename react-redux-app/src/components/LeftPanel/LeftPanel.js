import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { Panel, Screen } from "../StyledComponents";
import DexEntries from "./DexEntries";
import NameScreenText from "./NameScreen";
import MainSprite from "./MainSprite";

const NameScreen = styled(Screen)`
    font-size: 28px;
    letter-spacing: 4px;
    text-transform: capitalize;
    height: 45px;
    box-sizing: border-box;
`;

const LeftPanel = props => {
    return (
        <Panel>
            <NameScreen>
                {props.pokemon !== {} && !props.isFetching && (
                    <NameScreenText
                        name={props.pokemon.name}
                        dexNum={props.dexNum}
                    />
                )}
            </NameScreen>
            <MainSprite
                sprites={props.pokemon.sprites}
                name={props.pokemon.name}
                isFetching={props.isFetching}
            />
            <DexEntries
                dexEntries={props.dexEntries}
                isFetching={props.isFetching}
            />
        </Panel>
    );
};

const mapStateToProps = state => {
    return {
        pokemon: state.pokemon,
        dexEntries: state.dexEntries,
        dexNum: state.dexNum,
        isFetching: state.isFetching
    };
};

export default connect(mapStateToProps, {})(LeftPanel);
