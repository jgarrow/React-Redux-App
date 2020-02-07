import React from "react";
import styled from "styled-components";

import { Gap } from "./StyledComponents";

const DividerContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 30px;
    margin: 0 20px;
    align-items: center;
    border: inset #460f0f 4px;
    border-radius: 4px;
    background: #460f0f;

    & > * {
        border-radius: 4px;
        border: solid #2d0d0d 2px;
    }
`;

const FirstGap = styled(Gap)`
    border-radius: 0 0 5px 5px;
    border-top: none;
`;

const LastGap = styled(Gap)`
    border-radius: 5px 5px 0 0;
`;

const Hinge = styled.div`
    background: linear-gradient(
        90deg,
        #891313 0,
        #b31818 30%,
        #e61515 45%,
        #fd5555 65%,
        #e61515 95%
    );
    border-right-color: #fd5555;
    border-top-color: #fd5555;
    flex: 10;
    width: 100%;
    border-left-color: #5f1010;
`;

const Divider = () => {
    return (
        <DividerContainer>
            <FirstGap />
            <Hinge />
            <Gap />
            <Hinge />
            <Gap />
            <Hinge />
            <LastGap />
        </DividerContainer>
    );
};

export default Divider;
