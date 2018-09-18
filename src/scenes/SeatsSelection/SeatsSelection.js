import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Button from 'components/Button';
import Planet from 'components/Planet';
import SeatMap from './components/SeatMap';
import SpaceshipOutline from './spaceship_outline.svg';

// TODO: removed spaceship background, might return it back when improved

const Container = styled.div`
  /* background-image: url(${SpaceshipOutline}); */
  /* background-size: cover; */
  /* opacity: 0.05; */
  /* filter: drop-shadow(-5px -5px 5px #fff); */
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${props => props.theme.spacing.space_inset_l};
`;

const DestinationSubtitle = styled.span`
  font-size: ${props => props.theme.font.h5};
  color: ${props => props.theme.colors.orange};
`;

const DestinationTitle = styled.span`
  font-size: ${props => props.theme.font.h1};
  font-weight: 600;
  color: ${props => props.theme.colors.grey_light};
`;

const ButtonContainer = styled.div`
  margin: ${props => props.theme.spacing.space_l};
`;

const PlanetContainer = styled.div`
  display: none;

  @media (min-width: 1100px) {
    display: inherit;
    max-height: none;
    transform: none;
    position: absolute;
    top: 100px;
    left: 600px;
  }
`;

class SeatsSelection extends Component {
  state = {
    screenWidth: window.innerWidth,
  };

  componentDidMount() {
    this.listener = this.updateScreenWidth.bind(this);
    window.addEventListener('resize', this.listener);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.listener);
  }

  updateScreenWidth = () => this.setState({ screenWidth: window.innerWidth });

  calculatePlanetSize = () => {
    if (this.state.screenWidth < 1100) {
      return this.state.screenWidth * 2;
    }
    return this.state.screenWidth / 3;
  };

  render() {
    const { destinationSelected } = this.props.departureQuery;
    return (
      <Container>
        <HeaderContainer>
          <DestinationSubtitle>2 - SELECT YOUR SEATS</DestinationSubtitle>
          <DestinationTitle>{destinationSelected.name.toUpperCase()}</DestinationTitle>
        </HeaderContainer>
        <SeatMap />
        <ButtonContainer>
          <Button label="TRIP OVERVIEW" path={`/checkout/${destinationSelected.id}`} showArrow />
        </ButtonContainer>
        <PlanetContainer>
          <Planet name={destinationSelected.name} size={this.calculatePlanetSize()} />
        </PlanetContainer>
      </Container>
    );
  }
}

const DEPARTURE_QUERY = gql`
  query DepartureQuery {
    destinationSelected @client {
      id
      name
    }
  }
`;

export default graphql(DEPARTURE_QUERY, { name: 'departureQuery' })(SeatsSelection);
