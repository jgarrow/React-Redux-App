import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import styled from "styled-components";

import { pokemonReducer as reducer } from "./reducers";

import PokemonList from "./components/PokemonList";
import GenButtons from "./components/GenButtons";

const AppContainer = styled.div`
    background-color: #e61515;
    width: 848px;
    margin: 0 auto;
    padding: 1em;
    border-radius: 15px;
    border: double black 10px;
    display: flex;
`;

const Panel = styled.div`
    width: 359px;
    padding: 10px;
    border: inset #b31818 3px;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
`;

const RightPanel = styled(Panel)`
    padding: 0;
    width: 379px;
`;

const Screen = styled.div`
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

const NameScreen = styled(Screen)`
    font-size: 28px;
    letter-spacing: 4px;
    text-transform: capitalize;
    height: 45px;
    box-sizing: border-box;
`;

const DexNum = styled.span`
    float: right;
    text-transform: lowercase;
`;

const SpriteControls = styled.div`
    display: flex;
    justify-content: space-around;
    font-family: "Staatliches", cursive;
    margin-bottom: 10px;
`;

const SpriteControl = styled.div`
    height: 30px;
    width: 30px;
    border: groove grey 3px;
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: rotate(60deg);
    color: black;
    padding: 1px;
    border-color: #b06868;
`;

const ShinySpriteControl = styled(SpriteControl)`
    transform: rotate(0);
    background: linear-gradient(
        14deg,
        #bf8823 10%,
        #ffee90 25%,
        #e6a617 47%,
        #ffee90 73%,
        #fff6c8 74%,
        #ffee90 80%
    );
    border-color: #cdb589;
    width: 90px;
    text-shadow: white -1px 1px;

    & > * {
        transform: rotate(0);
    }
`;

const DescriptionScreen = styled(Screen)`
    font-size: 18px;
    letter-spacing: 0;
    min-height: 115px;
    box-sizing: border-box;
    flex: 1;
`;

const Divider = styled.div`
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

const Gap = styled.div`
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

const PanelRow = styled.div`
    display: flex;
    border-bottom: groove #757575 3px;
    justify-content: space-evenly;

    &:last-child {
        border-top: groove #757575 3px;
        border-bottom: none;
    }
`;

const StatsScreen = styled(Screen)`
    width: 150px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 5px;
    flex: 1;
`;

const StatLine = styled.p`
    font-size: 17px;
    text-transform: capitalize;
`;

const TypesContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-left: groove #757575 3px;
    flex: 1;
`;

const PanelHeader = styled.div`
    text-transform: capitalize;
    font-size: 1.25em;
    padding: 5px;
    font-family: "Staatliches", cursive;
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
        14deg,
        #460f0f 0,
        #891313 30%,
        #b31818 45%,
        #fd5555 65%,
        #b31818 95%
    );
    border: groove #e61515 3px;
    border-width: 3px 2px;
    text-shadow: #fd5555 -1px 1px;
`;

const TypesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-evenly;
    background: linear-gradient(14deg, #afafaf 50%, #ffffff 80%, #afafaf 90%);
    border-top: groove #757575 3px;
`;

const Type = styled.div`
    color: rgba(0, 0, 0, 0.9);
    text-transform: capitalize;
    font-size: 1.25em;
    padding: 2px;
    margin: 2px;
    border: groove #757575 3px;
    border-radius: 10px;
    width: 150px;
    font-family: "Staatliches", cursive;
    text-align: center;
    letter-spacing: 2px;
    text-shadow: rgba(255, 255, 255, 0.3) -1px 1px;
    align-self: center;
    background: linear-gradient(
        15deg,
        rgba(128, 128, 128, 0.5) 64%,
        rgba(138, 138, 138, 0.5) 70%,
        rgba(230, 230, 230, 0.5) 81%,
        rgba(255, 255, 255, 0.5) 86%,
        rgba(220, 220, 220, 0.5) 89%,
        rgba(230, 230, 230, 0.5) 100%
    );
    background-blend-mode: hard-light;
`;

const EvolutionPanel = styled(PanelRow)`
    flex-wrap: wrap;
`;

const FlexCenter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const EvolutionNum = styled.p`
    font-family: "Staatliches", cursive;
    font-size: 1.25em;
    letter-spacing: 2px;
    background: transparent;
    border: none;
    text-shadow: #e78181 -1px 1px;
`;

const EvolutionName = styled(Screen)`
    width: auto;
    padding: 3px;
    margin-bottom: 3px;
    text-align: right;
`;

const BlueButtons = styled(PanelRow)`
    flex-wrap: wrap;
    padding: 5px;
`;

const BlueButton = styled.div`
    height: 30px;
    flex: 1 1 16%;
    margin: 3px;
    border: groove #6c96e6 3px;
    border-radius: 5px;
    background: linear-gradient(
        15deg,
        rgba(128, 128, 128, 0.5) 64%,
        rgba(138, 138, 138, 0.5) 70%,
        rgba(230, 230, 230, 0.5) 81%,
        rgba(255, 255, 255, 0.5) 86%,
        rgba(220, 220, 220, 0.5) 89%,
        rgba(230, 230, 230, 0.5) 100%
    );
    background-blend-mode: hard-light;
    background-color: #09a8ff;
`;

const MoveScreen = styled(Screen)`
    margin: 3px;
    padding: 10px 20px;
    flex: 1;
    display: flex;
    justify-content: space-between;
`;

const MoveName = styled.div`
    font-size: 24px;
    border-bottom: solid black 2px;
    padding: 0 5px;
    margin-bottom: 3px;
    text-align: center;
    text-transform: capitalize;
`;

const MoveType = styled.div`
    font-size: 18px;
    text-transform: uppercase;
    border: solid black 2px;
    border-radius: 7px;
    padding: 2px 10px;
    text-align: center;
`;

const MoveLearn = styled.div`
    font-size: 20px;
    float: right;
    margin-right: 3px;
`;

const MoveControls = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 0 10px 0 7px;
`;

const MoveArrow = styled.div`
    height: 40px;
    width: 40px;
    font-size: 37px;
    border: groove grey 3px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: #e78181 -1px 1px;
    cursor: pointer;
    transform: rotate(60deg);
`;

const Controls = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 15px;
`;

const ControlsButton = styled.div`
    padding: 5px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: outset rgb(248, 187, 187) 6px;
    transform: rotate(60deg);
    background: radial-gradient(
        circle farthest-corner at 40% 25%,
        rgb(218, 237, 241) 9%,
        rgb(124, 214, 237) 20%,
        rgb(64, 90, 165) 62%,
        rgb(43, 125, 196) 100%
    );
    cursor: pointer;

    &:after {
        border: groove #460f0f 5px;
        content: "";
        width: 60px;
        height: 60px;
        position: absolute;
        border-radius: 50%;
        left: -10px;
        top: -10px;
        border-style: double;
        opacity: 0.75;
    }
`;

const NumInput = styled.input`
    width: 50px;
    font-size: 20px;
    height: 30px;
    text-align: right;
    align-self: center;
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

const Submit = styled.div`
    width: 66px;
    height: 18px;
    border: groove #5f845e 3px;
    background-color: #5ed75e;
    border-radius: 20px;
    box-sizing: border-box;
    margin-top: 3px;
    cursor: pointer;
`;

const store = createStore(reducer, applyMiddleware(thunk));

function App() {
    return (
        <Provider store={store}>
            <AppContainer>
                {/* <h1>Basic Pokedex</h1>
                <GenButtons />
                <PokemonList /> */}

                <Panel>
                    <NameScreen>
                        <DexNum />
                    </NameScreen>
                    <div>
                        <img />
                        <SpriteControls>
                            <SpriteControl>Female</SpriteControl>
                            <ShinySpriteControl>
                                <span>Shiny</span>
                            </ShinySpriteControl>
                            <SpriteControl>Rotate</SpriteControl>
                        </SpriteControls>
                    </div>
                    <DescriptionScreen></DescriptionScreen>
                </Panel>

                <Divider>
                    <FirstGap />
                    <Hinge />
                    <Gap />
                    <Hinge />
                    <Gap />
                    <Hinge />
                    <LastGap />
                </Divider>

                <RightPanel>
                    <PanelRow>
                        <StatsScreen>
                            <StatLine>Speed</StatLine>
                            <StatLine>Special Attack</StatLine>
                            <StatLine>Special Defense</StatLine>
                            <StatLine>Attack</StatLine>
                            <StatLine>Defense</StatLine>
                            <StatLine>HP</StatLine>
                        </StatsScreen>

                        <TypesContainer>
                            <PanelHeader></PanelHeader>
                            <TypesWrapper>
                                <Type></Type>
                                <Type></Type>
                            </TypesWrapper>
                        </TypesContainer>
                    </PanelRow>

                    <EvolutionPanel>
                        <div>
                            <FlexCenter>
                                <EvolutionNum>I</EvolutionNum>
                            </FlexCenter>
                            <img />
                            <EvolutionName></EvolutionName>
                        </div>

                        <div>
                            <FlexCenter>
                                <EvolutionNum>II</EvolutionNum>
                            </FlexCenter>
                            <img />
                            <EvolutionName></EvolutionName>
                        </div>

                        <div>
                            <FlexCenter>
                                <EvolutionNum>III</EvolutionNum>
                            </FlexCenter>
                            <img />
                            <EvolutionName></EvolutionName>
                        </div>
                    </EvolutionPanel>

                    <BlueButtons>
                        <BlueButton />
                        <BlueButton />
                        <BlueButton />
                        <BlueButton />
                        <BlueButton />
                        <BlueButton />
                        <BlueButton />
                        <BlueButton />
                        <BlueButton />
                        <BlueButton />
                    </BlueButtons>

                    <div style={{ display: "flex" }}>
                        <MoveScreen>
                            <div>
                                <MoveName></MoveName>
                                <p>Accuracy</p>
                                <p>Power</p>
                                <p>PP</p>
                            </div>

                            <div>
                                <MoveType>TYPE: </MoveType>
                                <MoveLearn>Learn: Lvl</MoveLearn>
                            </div>
                        </MoveScreen>

                        <MoveControls>
                            <MoveArrow></MoveArrow>
                            <MoveArrow></MoveArrow>
                        </MoveControls>
                    </div>

                    <Controls>
                        <ControlsButton />
                        <div>
                            <NumInput />
                            <Submit />
                        </div>
                        <ControlsButton />
                    </Controls>
                </RightPanel>
            </AppContainer>
        </Provider>
    );
}

export default App;
