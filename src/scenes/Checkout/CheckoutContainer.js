import React from 'react';
import { graphql, compose, Query } from 'react-apollo';
import Spinner from 'react-spinkit';
import gql from 'graphql-tag';
import moment from 'moment';
import { TICKETS_QUERY as SEATMAP_QUERY } from 'scenes/SeatsSelection/components/SeatMap/TICKETS_QUERY';
import { TICKETS_QUERY as USER_TICKETS_QUERY } from 'scenes/Tickets/TICKETS_QUERY';
import Checkout from './Checkout';

const times = {
  morning: '5:45AM',
  afternoon: '1:00PM',
  evening: '8:00PM',
};

const CheckoutContainer = ({ departureQuery, ticketsPaid }) => {
  const { destinationSelected, dateSelected, timeSelected } = departureQuery;

  return (
    <Query
      query={TICKETS_QUERY}
      variables={{
        destinationId: destinationSelected.id,
        date: dateSelected,
        time: timeSelected,
      }}
    >
      {({ loading, error, data }) => {
        if (loading) return <Spinner name="double-bounce" />;
        if (error) {
          return <div>Error</div>;
        }
        const destinationName = destinationSelected.name;
        const departureDate = moment(dateSelected).format('MMM D, YYYY');
        // TODO: create departure type in DB?
        const departureTime = times[timeSelected];
        const { ticketPrice } = destinationSelected;
        const tickets = data.ticketsSelected;
        return (
          <Checkout
            destinationName={destinationName}
            departureDate={departureDate}
            departureTime={departureTime}
            tickets={tickets}
            ticketPrice={ticketPrice}
            onPaymentSuccess={() =>
              ticketsPaid({
                variables: { tickets },
                refetchQueries: [
                  {
                    query: SEATMAP_QUERY,
                    variables: {
                      destinationId: destinationSelected.id,
                      date: dateSelected,
                      time: timeSelected,
                    },
                  },
                  {
                    query: USER_TICKETS_QUERY,
                  },
                ],
              })
            }
          />
        );
      }}
    </Query>
  );
};

// get tickets for the current user
const TICKETS_QUERY = gql`
  query TicketsQuery($destinationId: String, $date: String, $time: String) {
    ticketsSelected(destinationId: $destinationId, date: $date, time: $time) {
      id
      date
      time
      seatId
      owner {
        id
      }
      paid
    }
  }
`;

const DEPARTURE_QUERY = gql`
  query DepartureQuery {
    destinationSelected @client {
      id
      name
      ticketPrice
    }
    dateSelected @client
    timeSelected @client
  }
`;

const TICKETS_PAID_MUTATION = gql`
  mutation TicketsPaid($tickets: Json!) {
    ticketsPaid(tickets: $tickets) {
      count
    }
  }
`;

export default compose(
  graphql(TICKETS_QUERY, { name: 'ticketsQuery' }),
  graphql(DEPARTURE_QUERY, { name: 'departureQuery' }),
  graphql(TICKETS_PAID_MUTATION, { name: 'ticketsPaid' }),
)(CheckoutContainer);
