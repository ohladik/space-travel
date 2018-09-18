import React from 'react';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import TimeCard from './components/TimeCard';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: ${props => props.theme.spacing.space_m};

  @media (max-width: 1100px) {
    margin: 0;
    margin-top: ${props => props.theme.spacing.space_m};
    margin-left: ${props => props.theme.spacing.space_l};
    overflow-x: auto;
  }
`;

const TimeSelection = (props) => {
  const { departures } = props;
  return (
    <Container>
      {Object.keys(departures).map((time, i) => (
        <TimeCard
          time={time}
          active={props.timeQuery.timeSelected === time}
          key={`${time}${i}`}
          onClick={() => props.timeSelected({ variables: { time } })}
        />
      ))}
    </Container>
  );
};

const TIME_SELECTED_QUERY = gql`
  query TimeSelectedQuery {
    timeSelected @client
  }
`;

const TIME_SELECTED_MUTATION = gql`
  mutation TimeSelected($time: String) {
    timeSelected(time: $time) @client
  }
`;

export default compose(
  graphql(TIME_SELECTED_MUTATION, { name: 'timeSelected' }),
  graphql(TIME_SELECTED_QUERY, { name: 'timeQuery' }),
)(TimeSelection);
