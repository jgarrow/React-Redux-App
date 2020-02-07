import styled from "styled-components";

export const Panel = styled.div`
    width: 359px;
    padding: 10px;
    border: inset #b31818 3px;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
`;

export const Screen = styled.div`
    background: linear-gradient(
        14deg,
        rgb(165, 205, 83) 60%,
        rgb(193, 217, 144) 65%
    );
    padding: 5px;
    border-radius: 3px;
    font-family: "VT323";
    border: inset #879a65 3px;
`;

export const SpriteControl = styled.div`
    height: 30px;
    width: 30px;
    border: groove grey 3px;
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    padding: 1px;
    border-color: #b06868;
`;

export const Gap = styled.div`
    background: linear-gradient(
        90deg,
        #460f0f 0,
        #891313 30%,
        #b31818 45%,
        #fd5555 65%,
        #b31818 95%
    );
    border-top-color: #891313;
    border-right-color: #b31818;
    flex: 1;
    width: 95%;
`;

export const PanelRow = styled.div`
    display: flex;
    border-bottom: groove #757575 3px;
    justify-content: space-evenly;

    &:last-child {
        border-top: groove #757575 3px;
        border-bottom: none;
    }
`;
