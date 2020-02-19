import { useState } from "react";

export const useGetPokemon = () => {
    const [inputNum, setInputNum] = useState(1);

    const endpoint = `https://pokeapi.co/api/v2/pokemon/`;

    const getInputNum = () => inputNum;
    const decrementInputNum = () => {
        let newInput = inputNum - 1;

        if (newInput < 1) {
            newInput = 806;
        }

        setInputNum(newInput);
    };
    const incrementInputNum = () => {
        let newInput = inputNum + 1;

        if (newInput > 806) {
            newInput = 1;
        }

        setInputNum(newInput);
    };

    const getEndpoint = () => endpoint + inputNum;

    return {
        getInputNum,
        setInputNum,
        decrementInputNum,
        incrementInputNum,
        getEndpoint
    };
};
