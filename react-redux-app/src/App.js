import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import styled from "styled-components";

import { pokemonReducer as reducer } from "./reducers";

// import PokemonList from "./components/PokemonList";
// import GenButtons from "./components/GenButtons";

import LeftPanel from "./components/LeftPanel";
import Divider from "./components/Divider";
import RightPanel from "./components/RightPanel";

const AppContainer = styled.div`
    background-color: #e61515;
    width: 848px;
    margin: 0 auto;
    padding: 1em;
    border-radius: 15px;
    border: double black 10px;
    display: flex;
`;

const store = createStore(reducer, applyMiddleware(thunk));

function App() {
    return (
        <Provider store={store}>
            <AppContainer>
                {/* <h1>Basic Pokedex</h1>
                <GenButtons />
                <PokemonList /> */}

                <LeftPanel />
                <Divider />
                <RightPanel />
            </AppContainer>
        </Provider>
    );
}

export default App;
