import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import DestinationCard from './components/DestinationCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  margin-top: ${props => props.theme.spacing.space_l};
  margin-left: ${props => props.theme.spacing.space_l};
  color: ${props => props.theme.colors.grey_light};
  font-size: ${props => props.theme.font.h1};
  font-weight: bold;

  @media (min-width: 1100px) {
    display: none;
  }
`;

const DestinationsContainer = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  width: auto;
  padding: ${props => props.theme.spacing.space_l};

  @media (min-width: 1100px) {
    white-space: normal;
  }
`;

const CardLink = styled(Link)`
  margin-right: ${props => props.theme.spacing.space_l};
  margin-top: ${props => props.theme.spacing.space_l};
`;

const DestinationsList = (props) => {
  if (props.destinationsQuery && props.destinationsQuery.loading) {
    return <Spinner name="double-bounce" color="white" />;
  }

  if (props.destinationsQuery && props.destinationsQuery.error) {
    return <div>Error</div>;
  }

  const { destinations } = props.destinationsQuery;

  return (
    <Container>
      <Header>Destinations</Header>
      <DestinationsContainer>
        {destinations.map(destination => (
          <CardLink
            to={`/destination/${destination.id}`}
            key={destination.id}
            onClick={() => props.destinationSelected({ variables: { destination } })}
          >
            <DestinationCard destination={destination} />
          </CardLink>
        ))}
      </DestinationsContainer>
    </Container>
  );
};

const DESTINATIONS_QUERY = gql`
  query DestinationsQuery {
    destinations {
      id
      name
      descriptionShort
      ticketPrice
    }
  }
`;

const DESTINATION_SELECTED_MUTATION = gql`
  mutation DestinationSelected($destination: String) {
    destinationSelected(destination: $destination) @client
  }
`;

export default compose(
  graphql(DESTINATIONS_QUERY, { name: 'destinationsQuery' }),
  graphql(DESTINATION_SELECTED_MUTATION, { name: 'destinationSelected' }),
)(DestinationsList);
