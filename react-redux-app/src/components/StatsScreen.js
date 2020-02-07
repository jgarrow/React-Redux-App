import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { Screen } from "./StyledComponents";

const StatScreen = styled(Screen)`
    width: 150px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    margin: 5px;
    flex: 1;
`;

const StatLabel = styled.p`
    font-size: 17px;
    text-transform: capitalize;
    margin: 0;
`;

const StatNum = styled.p``;

const StatsScreen = props => {
    const handleGetStat = name => {
        let tempArray = [...props.stats];
        let stat = props.pokemon.stats.find(stat => stat.stat.name === name);

        stat = stat["base_stat"];
        console.log(`${name} base state: `, stat);

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
        pokemon: state.pokemon,
        stats: state.stats
    };
};

export default connect(mapStateToProps, {})(StatsScreen);
