import gql from 'graphql-tag';

// get all tickets for the current user
export const TICKETS_QUERY = gql`
  query TicketsQuery {
    usersTickets {
      id
      destination {
        id
        name
      }
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
