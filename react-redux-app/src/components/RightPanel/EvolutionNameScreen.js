import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const EvolutionName = styled.p`
    margin: 0;
`;

const NameSlides = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 28px;
    max-height: 28px;
    display: grid;
    grid-template-rows: ${props => `repeat(${props.numOfNames}, 100%)`};
    transform: ${props => `translateY(${props.translateValue}%)`};
    transition: transform 0.45s ease-out;
`;

const EvolutionNameScreen = ({ evolTier, entryPos, isFetching }) => {
    return (
        <>
            {!isFetching &&
                evolTier &&
                evolTier.map((name, index) => {
                    name = name.charAt(0).toUpperCase() + name.slice(1);

                    return (
                        <NameSlides
                            key={index}
                            numOfNames={evolTier.length}
                            translateValue={entryPos}
                        >
                            <EvolutionName>{name}</EvolutionName>
                        </NameSlides>
                    );
                })}
        </>
    );
};

const mapStateToProps = state => {
    return {
        isFetching: state.isFetching
    };
};

export default connect(mapStateToProps, {})(EvolutionNameScreen);
