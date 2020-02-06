import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import styled from "styled-components";

import { pokemonReducer as reducer } from "./reducers";

import PokemonList from "./components/PokemonList";
import GenButtons from "./components/GenButtons";

const AppContainer = styled.div`
    text-align: center;
    margin-bottom: 1.5rem;
`;

const store = createStore(reducer, applyMiddleware(thunk));

function App() {
    return (
        <Provider store={store}>
            <AppContainer>
                <h1>Basic Pokedex</h1>
                <GenButtons />
                <PokemonList />
            </AppContainer>
        </Provider>
    );
}

export default App;
