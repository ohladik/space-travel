import React from 'react';
import { graphql, compose } from 'react-apollo';
import moment from 'moment';
import gql from 'graphql-tag';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import styled from 'styled-components';
import './datepicker_custom_styles.css';

const Container = styled.div`
  margin: ${props => props.theme.spacing.space_m};
`;

// Date from SingleDatePicker is a Moment.js date object
// It seems that for some reason it can't be stored in apollo-link-state
// Solution: store it as a string in apollo state
const DateSelection = (props) => {
  let date = moment(props.dateQuery.dateSelected);
  date = date.isValid() ? date : null;
  return (
    <Container>
      <SingleDatePicker
        date={date}
        onDateChange={newDate =>
          props.dateSelected({ variables: { date: moment(newDate._d).toISOString() } })
        }
        onFocusChange={() => {}}
        focused
        numberOfMonths={1}
        readOnly
      />
    </Container>
  );
};

const DATE_SELECTED_QUERY = gql`
  query DateSelectedQuery {
    dateSelected @client
  }
`;

const DATE_SELECTED_MUTATION = gql`
  mutation DateSelected($date: String) {
    dateSelected(date: $date) @client
  }
`;

export default compose(
  graphql(DATE_SELECTED_MUTATION, { name: 'dateSelected' }),
  graphql(DATE_SELECTED_QUERY, { name: 'dateQuery' }),
)(DateSelection);
