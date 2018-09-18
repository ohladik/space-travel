import React, { Component } from 'react';
import { graphql, compose, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Spinner from 'react-spinkit';
import { SEATS_COUNT } from 'constants.js';
import { TICKETS_QUERY } from './TICKETS_QUERY.js';
import SeatMap from './SeatMap';

class SeatMapContainer extends Component {
  // Get:
  // A - tickets of other users - paid and not paid
  //              - tickets of the current user - only paid for
  //            - These seats are marked as not available
  // B - tickets of the current user - only not paid for - seats marked as selected
  // All other seats will be available

  getAvailableSeats(notAvailable, selected) {
    return SEATS_COUNT - notAvailable - selected;
  }

  // available, notAvailable, selected
  getSeatStatus(notAvailableSeats, selectedSeats, seatId) {
    let status = 'available';
    if (notAvailableSeats.indexOf(seatId) !== -1) {
      status = 'notAvailable';
    } else if (selectedSeats.indexOf(seatId) !== -1) {
      status = 'selected';
    }
    return status;
  }
  subscribeToTicketUpdates = (subscription) => {
    const { destinationSelected, dateSelected, timeSelected } = this.props.departureQuery;
    return subscription({
      variables: { destinationId: destinationSelected.id, date: dateSelected, time: timeSelected },
      document: gql`
        subscription tickets($destinationId: String!, $date: String!, $time: String!) {
          tickets(destinationId: $destinationId, date: $date, time: $time) {
            mutation
            previousValues {
              id
            }
            node {
              id
              owner {
                id
              }
              destination {
                id
              }
              date
              time
              seatId
              paid
            }
          }
        }
      `,
      updateQuery: (previous, { subscriptionData }) => {
        const currentUserId = localStorage.getItem('userId');

        // mutation is "CREATED" or "DELETED"
        let { ticketsSelected, ticketsNotAvailable } = previous;
        const { mutation, node, previousValues } = subscriptionData.data.tickets;
        if (mutation === 'CREATED') {
          if (node.owner.id === currentUserId) {
            // seat selected by the current user, add this ticket to ticketsSelected
            ticketsSelected = [node, ...ticketsSelected];
          } else {
            // seat selected by another user, add this ticket to ticketsNotAvailable
            ticketsNotAvailable = [node, ...ticketsNotAvailable];
          }
        } else {
          // ticket was deleted, is available as "previousValues"
          // additional properties can be queried in the subscription query above

          // seat deselected by the current user, remove this ticket from ticketsSelected
          ticketsSelected = ticketsSelected.filter(ticket => ticket.id !== previousValues.id);
          // seat deselected by another user, remove this ticket from ticketsNotAvailable
          ticketsNotAvailable = ticketsNotAvailable.filter(ticket => ticket.id !== previousValues.id);
        }

        const result = {
          ...previous,
          ticketsSelected,
          ticketsNotAvailable,
        };
        return result;
      },
    });
  };

  createTicket = async (seatId) => {
    const { destinationSelected, dateSelected, timeSelected } = this.props.departureQuery;

    const result = await this.props.createTicketMutation({
      variables: {
        destinationId: destinationSelected.id,
        date: dateSelected,
        time: timeSelected,
        seatId,
      },
    });
  };

  deleteTicket = async (seatId, ticketsSelected) => {
    const ticketId = ticketsSelected.filter(ticket => parseInt(ticket.seatId, 10) === seatId)[0].id;

    const result = await this.props.deleteTicketMutation({
      variables: {
        id: ticketId,
      },
    });
  };

  seatSelected = (seatId, status, ticketsSelected) => {
    if (status === 'notAvailable') return;
    if (status === 'available') {
      this.createTicket(seatId);
    } else {
      this.deleteTicket(seatId, ticketsSelected);
    }
  };

  render() {
    const { destinationSelected, dateSelected, timeSelected } = this.props.departureQuery;
    return (
      <Query
        query={TICKETS_QUERY}
        variables={{
          destinationId: destinationSelected.id,
          date: dateSelected,
          time: timeSelected,
        }}
      >
        {({
 loading, error, data, subscribeToMore,
}) => {
          if (loading) return <Spinner name="double-bounce" />;
          if (error) {
            return <div>Error</div>;
          }
          const { ticketsNotAvailable, ticketsSelected } = data;
          const ticketsNotAvailableCount = ticketsNotAvailable.length;
          const ticketsSelectedCount = ticketsSelected.length;
          const availableSeatsCount = this.getAvailableSeats(
            ticketsNotAvailableCount,
            ticketsSelectedCount,
          );
          // seatId is a string
          const notAvailableSeats = ticketsNotAvailable.map(ticket => parseInt(ticket.seatId, 10));
          const selectedSeats = ticketsSelected.map(ticket => parseInt(ticket.seatId, 10));

          return (
            <SeatMap
              availableSeatsCount={availableSeatsCount}
              notAvailableSeats={notAvailableSeats}
              selectedSeats={selectedSeats}
              ticketsSelected={ticketsSelected}
              getSeatStatus={this.getSeatStatus}
              onSeatSelection={this.seatSelected}
              subscribeToTicketUpdates={() => this.subscribeToTicketUpdates(subscribeToMore)}
            />
          );
        }}
      </Query>
    );
  }
}

const DEPARTURE_QUERY = gql`
  query DepartureQuery {
    destinationSelected @client {
      id
    }
    dateSelected @client
    timeSelected @client
  }
`;

const CREATE_TICKET_MUTATION = gql`
  mutation CreateTicketMutation(
    $destinationId: String!
    $date: String!
    $time: String!
    $seatId: String!
  ) {
    createTicket(destinationId: $destinationId, date: $date, time: $time, seatId: $seatId) {
      id
    }
  }
`;

const DELETE_TICKET_MUTATION = gql`
  mutation DeleteTicketMutation($id: String!) {
    deleteTicket(id: $id) {
      id
    }
  }
`;

export default compose(
  graphql(TICKETS_QUERY, { name: 'ticketsQuery' }),
  graphql(DEPARTURE_QUERY, { name: 'departureQuery' }),
  graphql(CREATE_TICKET_MUTATION, { name: 'createTicketMutation' }),
  graphql(DELETE_TICKET_MUTATION, { name: 'deleteTicketMutation' }),
)(SeatMapContainer);
