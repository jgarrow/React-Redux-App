import React from "react";
import styled from "styled-components";

const Name = styled.p`
    font-size: 28px;
    font-family: "VT323";
    letter-spacing: 4px;
    text-transform: capitalize;
    margin: 0;
    display: inline;
`;

const DexNum = styled.span`
    float: right;
    text-transform: lowercase;
`;

const NameScreenText = ({ name, dexNum }) => {
    return (
        <>
            <Name>{name}</Name>
            <DexNum>{dexNum ? `no. ${dexNum}` : ""}</DexNum>
        </>
    );
};

export default NameScreenText;
