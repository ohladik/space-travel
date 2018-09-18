import React, { Component } from 'react';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Button from 'components/Button';
import Planet from 'components/Planet';
import HorizontalDivider from 'components/HorizontalDivider';
import TimeSelection from './components/TimeSelection';
import DateSelection from './components/DateSelection';
import AccountPrompt from './components/AccountPrompt';
import { AUTH_TOKEN } from '../../constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${props => props.theme.spacing.space_inset_l};

  @media (max-width: 1100px) {
    margin-left: ${props => props.theme.spacing.space_l};
    margin-top: ${props => props.theme.spacing.space_m};
    margin-bottom: 0;
  }
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

const DividerContainer = styled.div`
  max-width: 400px;
`;

const ButtonContainer = styled.div`
  margin-left: ${props => props.theme.spacing.space_l};
`;

const Message = styled.div`
  margin-left: ${props => props.theme.spacing.space_l};
  margin-bottom: ${props => props.theme.spacing.space_l};
  color: ${props => props.theme.colors.red};
`;

// not dynamic
const departures = {
  morning: true,
  afternoon: true,
  evening: true,
};

class DepartureSelection extends Component {
  state = {
    screenWidth: window.innerWidth,
    selectionComplete: false,
  };

  componentDidMount() {
    this.listener = this.updateScreenWidth.bind(this);
    window.addEventListener('resize', this.listener);
  }

  componentWillReceiveProps(nextProps) {
    this.validateDepartureSelection(nextProps);
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

  validateDepartureSelection(nextProps) {
    const { destinationSelected, dateSelected, timeSelected } = nextProps.departureQuery;
    this.setState({ selectionComplete: destinationSelected && dateSelected && timeSelected });
  }

  render() {
    const { destinationSelected, dateSelected, timeSelected } = this.props.departureQuery;
    const buttonDisabled = !(destinationSelected && dateSelected && timeSelected);
    const authToken = localStorage.getItem(AUTH_TOKEN);

    if (authToken) {
      return (
        <Container>
          <HeaderContainer>
            <DestinationSubtitle>1 - SELECT DEPARTURE</DestinationSubtitle>
            <DestinationTitle>{destinationSelected.name.toUpperCase()}</DestinationTitle>
          </HeaderContainer>
          <TimeSelection departures={departures} />
          <DateSelection />
          <DividerContainer>
            <HorizontalDivider />
          </DividerContainer>
          <Message>
            {this.state.selectionComplete ? null : 'Please select date and time of departure.'}
          </Message>
          <ButtonContainer>
            <Button
              label="SEAT SELECTION"
              path={`/seats/${destinationSelected.id}`}
              disabled={buttonDisabled}
              showArrow
            />
          </ButtonContainer>
          <PlanetContainer>
            <Planet name={destinationSelected.name} size={this.calculatePlanetSize()} />
          </PlanetContainer>
        </Container>
      );
    }
    return <AccountPrompt />;
  }
}

const DEPARTURE_QUERY = gql`
  query DepartureQuery {
    destinationSelected @client {
      id
      name
    }
    dateSelected @client
    timeSelected @client
  }
`;

export default graphql(DEPARTURE_QUERY, { name: 'departureQuery' })(DepartureSelection);
