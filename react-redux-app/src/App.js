import React from "react";
import styled from "styled-components";

import LeftPanel from "./components/LeftPanel/LeftPanel";
import Divider from "./components/Divider";
import RightPanel from "./components/RightPanel/RightPanel";

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

const App = () => {
    return (
        <AppContainer>
            <LeftPanel />
            <Divider />
            <RightPanel />
        </AppContainer>
    );
};

export default App;
