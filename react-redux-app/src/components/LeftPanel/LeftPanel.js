import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { connect } from "react-redux";

import { Panel, Screen } from "../StyledComponents";
import DexEntries from "./DexEntries";
import NameScreenText from "./NameScreen";
import MainSprite from "./MainSprite";

const NameScreen = styled(Screen)`
    font-size: 28px;
    letter-spacing: 4px;
    text-transform: capitalize;
    height: 45px;
    box-sizing: border-box;
`;

const LeftPanel = props => {
    const [dexEntries, setDexEntries] = useState([]);
    const [dexNum, setDexNum] = useState(null);

    // get dexEntries and dexNum
    useEffect(() => {
        let dexNumArray = [];
        let natDexNum = null;
        let entries = [];

        if (props.pokemon !== {} && props.pokemon.species) {
            axios
                .get(props.pokemon.species.url)
                .then(res => {
                    console.log("leftPanel comp state species url res: ", res);

                    // array of dex objects for different pokedexes
                    dexNumArray = [...res.data["pokedex_numbers"]];

                    // find the national dex object
                    natDexNum = dexNumArray.find(
                        obj => obj.pokedex.name === "national"
                    );

                    // get just the national dex number
                    natDexNum = natDexNum["entry_number"];

                    entries = [...res.data["flavor_text_entries"]];

                    // only keep the english entries
                    entries = entries.filter(
                        entry => entry.language.name === "en"
                    );

                    // make all whitespace consistent by making them all spaces
                    entries.forEach(entry => {
                        entry["flavor_text"] = entry["flavor_text"].replace(
                            /\s/gm,
                            " "
                        );
                    });

                    // find and get rid of duplicate entries
                    entries = entries.reduce((acc, current) => {
                        const x = acc.find(
                            item =>
                                item["flavor_text"] === current["flavor_text"]
                        );
                        if (!x) {
                            return acc.concat([current]);
                        } else {
                            return acc;
                        }
                    }, []);

                    setDexEntries(entries);
                    setDexNum(natDexNum);
                })
                .catch(err => {
                    console.log(
                        "Error getting species url in LeftPanel: ",
                        err
                    );
                });
        }
    }, [props.pokemon]);

    return (
        <Panel>
            <NameScreen>
                {props.pokemon !== {} && (
                    <NameScreenText name={props.pokemon.name} dexNum={dexNum} />
                )}
            </NameScreen>
            <MainSprite
                sprites={props.pokemon.sprites}
                name={props.pokemon.name}
            />
            <DexEntries dexEntries={dexEntries} />
        </Panel>
    );
};

const mapStateToProps = state => {
    return {
        pokemon: state.pokemon,
        isFetching: state.isFetching
    };
};

export default connect(mapStateToProps, {})(LeftPanel);
