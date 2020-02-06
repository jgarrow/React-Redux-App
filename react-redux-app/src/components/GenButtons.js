import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { getPokemon } from "../actions";

const GenButtons = props => {
    const handleGetNewGen = apiUrl => {
        props.getPokemon(apiUrl);
    };

    return (
        <div>
            <p onClick={() => handleGetNewGen(props.genApiUrls["gen1"])}>
                Gen I
            </p>
            <p onClick={() => handleGetNewGen(props.genApiUrls["gen2"])}>
                Gen II
            </p>
            <p onClick={() => handleGetNewGen(props.genApiUrls["gen3"])}>
                Gen III
            </p>
            <p onClick={() => handleGetNewGen(props.genApiUrls["gen4"])}>
                Gen IV
            </p>
            <p onClick={() => handleGetNewGen(props.genApiUrls["gen5"])}>
                Gen V
            </p>
            <p onClick={() => handleGetNewGen(props.genApiUrls["gen6"])}>
                Gen VI
            </p>
            <p onClick={() => handleGetNewGen(props.genApiUrls["gen7"])}>
                Gen VII
            </p>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        genApiUrls: state.genApiUrls
    };
};

export default connect(mapStateToProps, { getPokemon })(GenButtons);
