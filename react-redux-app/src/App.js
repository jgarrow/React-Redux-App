import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { getPokemon, updateInputNum } from './actions';

import LeftPanel from './components/LeftPanel/LeftPanel';
import Divider from './components/Divider';
import RightPanel from './components/RightPanel/RightPanel';

const AppContainer = styled.div`
    background-color: #e61515;
    width: 848px;
    margin: 0 auto;
    padding: 1em;
    border-radius: 15px;
    border: double black 10px;
    display: flex;
`;

// styling from Eric Varela -- https://codepen.io/siliconunicorn/pen/VqoxXP

const App = ({ updateInputNum, getPokemon }) => {
    const getRandomNum = () => {
        const max = 808; // excluding 808
        const randomNum = Math.floor(Math.random() * Math.floor(max));

        return randomNum;
    };

    useEffect(() => {
        const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;
        const randomNum = getRandomNum();
        updateInputNum('new input', randomNum);
        getPokemon(baseUrl + randomNum);
    }, [updateInputNum, getPokemon]);

    return (
        <AppContainer>
            <LeftPanel />
            <Divider />
            <RightPanel />
        </AppContainer>
    );
};

const mapStateToProps = (state) => {
    return {
        pokemon: state.pokemon,
        inputNum: state.inputNum,
    };
};

export default connect(mapStateToProps, { getPokemon, updateInputNum })(App);
