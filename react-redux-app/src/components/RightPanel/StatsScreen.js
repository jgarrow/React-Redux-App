import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { Screen } from "../StyledComponents";

const StatScreen = styled(Screen)`
    box-sizing: border-box;
    width: 150px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    margin: 5px;
    flex: 1;
    min-height: 118px;
    max-height: 118px;
    display: grid;
    grid-template-columns: 1fr 20px;
`;

const StatLabel = styled.p`
    font-size: 17px;
    text-transform: capitalize;
    margin: 0;
`;

const StatNum = styled.p`
    margin: 0;
    justify-self: flex-end;
`;

const StatsScreen = props => {
    const handleGetStat = name => {
        let stat = props.pokemon.stats.find(stat => stat.stat.name === name);
        stat = stat["base_stat"];

        return stat;
    };

    return (
        <StatScreen>
            {props.pokemon.stats && (
                <>
                    <StatLabel>Speed</StatLabel>
                    <StatNum>{handleGetStat("speed")}</StatNum>

                    <StatLabel>Special Attack</StatLabel>
                    <StatNum>{handleGetStat("special-attack")}</StatNum>

                    <StatLabel>Special Defense</StatLabel>
                    <StatNum>{handleGetStat("special-defense")}</StatNum>

                    <StatLabel>Attack</StatLabel>
                    <StatNum>{handleGetStat("attack")}</StatNum>

                    <StatLabel>Defense</StatLabel>
                    <StatNum>{handleGetStat("defense")}</StatNum>

                    <StatLabel>HP</StatLabel>
                    <StatNum>{handleGetStat("hp")}</StatNum>
                </>
            )}
        </StatScreen>
    );
};

const mapStateToProps = state => {
    return {
        pokemon: state.pokemon
        // stats: state.stats
    };
};

export default connect(mapStateToProps, {})(StatsScreen);
