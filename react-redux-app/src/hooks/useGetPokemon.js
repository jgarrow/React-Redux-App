import { useState, useEffect } from "react";

export const useGetPokemon = () => {
    const [inputNum, setInputNum] = useState(1);

    // useEffect(() => {
    //     const providedInput = newInput ? newInput : inputNum;
    //     setInputNum(providedInput);
    // }, [newInput]);

    const endpoint = `https://pokeapi.co/api/v2/pokemon/`;

    const getInputNum = () => inputNum;

    const setNewInput = num => setInputNum(num);

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

    const getEndpoint = () => {
        console.log("inputNum in getEndpoint: ", inputNum);
        return endpoint + inputNum;
    };

    return {
        getInputNum,
        setNewInput,
        decrementInputNum,
        incrementInputNum,
        getEndpoint
    };
};
