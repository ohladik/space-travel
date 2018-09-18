import gql from 'graphql-tag';

// get both ticketsNotAvailable and ticketsSelected for the current user
export const TICKETS_QUERY = gql`
  query TicketsQuery($destinationId: String, $date: String, $time: String) {
    ticketsNotAvailable(destinationId: $destinationId, date: $date, time: $time) {
      id
      destination {
        id
      }
      date
      time
      seatId
      owner {
        id
      }
      paid
    }

    ticketsSelected(destinationId: $destinationId, date: $date, time: $time) {
      id
      destination {
        id
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
