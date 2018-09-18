import React from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Ticket from './components/Ticket';
import { TICKETS_QUERY } from './TICKETS_QUERY';

const Header = styled.div`
  margin: ${props => props.theme.spacing.space_l};
  color: ${props => props.theme.colors.grey_light};
  font-size: ${props => props.theme.font.h1};
  font-weight: bold;

  @media (min-width: 1100px) {
    display: none;
  }
`;

const TicketsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const TicketList = () => (
  <Query query={TICKETS_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;
      const { usersTickets } = data;

      // TODO: display a message when there are no tickets

      return (
        <div>
          <Header>Tickets</Header>
          <TicketsContainer>
            {usersTickets.map(({
 destination, date, time, seatId, id,
}) => (
  <Ticket
    destination={destination}
    date={date}
    time={time}
    seatNumber={seatId}
    id={id}
    key={id}
  />
            ))}
          </TicketsContainer>
        </div>
      );
    }}
  </Query>
);

export default TicketList;
