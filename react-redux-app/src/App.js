import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { pokemonReducer as reducer } from "./reducers";

import PokemonList from "./components/PokemonList";

const store = createStore(reducer, applyMiddleware(thunk));

function App() {
    return (
        <Provider store={store}>
            <div>
                <h1>Hello world</h1>
                <PokemonList />
            </div>
        </Provider>
    );
}

export default App;
