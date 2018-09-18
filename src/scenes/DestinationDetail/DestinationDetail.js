import React, { Component } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import HorizontalDivider from 'components/HorizontalDivider';
import Button from 'components/Button';
import Planet from 'components/Planet';
import TripInfo from './components/TripInfo';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 65px);
  overflow: hidden;
`;

const DescriptionContainer = styled.div`
  max-width: 350px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${props => props.theme.spacing.space_m};
  margin-left: ${props => props.theme.spacing.space_l};
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

const DestinationDescription = styled.div`
  font-size: ${props => props.theme.font.paragraph};
  color: ${props => props.theme.colors.grey_light};
  margin-left: ${props => props.theme.spacing.space_l};
  margin-right: ${props => props.theme.spacing.space_l};
`;

const PlanetContainer = styled.div`
  transform: translateX(-50%);

  @media (min-width: 1100px) {
    transform: none;
    position: absolute;
    top: 100px;
    left: 600px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid;
  border-color: ${props => props.theme.colors.orange};
  margin-left: ${props => props.theme.spacing.space_l};
  margin-bottom: ${props => props.theme.spacing.space_m};
  padding: ${props => props.theme.spacing.space_s};
`;

const ButtonPriceLabel = styled.span`
  color: ${props => props.theme.colors.grey_light};
  font-weight: bold;
  font-size: 14px;
  width: 100px;
  margin-bottom: ${props => props.theme.spacing.space_s};
`;

class DestinationDetail extends Component {
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
    return (
      <Query query={GET_DESTINATION} variables={{ id: this.props.match.params.id }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;

          const destination = data.destinations[0];
          if (destination) {
            const {
 tripDuration, temperature, wifiAvailable, kidsFriendly,
} = destination;

            return (
              <Container>
                <DescriptionContainer>
                  <HeaderContainer>
                    <DestinationSubtitle>WELCOME TO</DestinationSubtitle>
                    <DestinationTitle>{destination.name.toUpperCase()}</DestinationTitle>
                  </HeaderContainer>
                  <DestinationDescription>{destination.descriptionLong}</DestinationDescription>
                  <HorizontalDivider />
                  <TripInfo
                    tripDuration={tripDuration}
                    temperature={temperature}
                    wifiAvailable={wifiAvailable}
                    kidsFriendly={kidsFriendly}
                  />
                  <ButtonContainer>
                    <ButtonPriceLabel>Starting from ${destination.ticketPrice}</ButtonPriceLabel>
                    <Button label="GET TICKET" path={`/departure/${destination.id}`} />
                  </ButtonContainer>
                </DescriptionContainer>
                <PlanetContainer>
                  <Planet name={destination.name} size={this.calculatePlanetSize()} />
                </PlanetContainer>
              </Container>
            );
          }
          return <div>Destination not found</div>;
        }}
      </Query>
    );
  }
}

const GET_DESTINATION = gql`
  query DestinationDetail($id: ID!) {
    destinations(id: $id) {
      id
      name
      descriptionLong
      ticketPrice
      tripDuration
      temperature
      wifiAvailable
      kidsFriendly
    }
  }
`;

export default DestinationDetail;
