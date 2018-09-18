import React, { Component } from 'react';
import styled from 'styled-components';
import { SEATS_COUNT } from 'constants.js';
import AvailableSeats from './components/AvailableSeats';
import Seat from './components/Seat';

const Container = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: ${props => props.theme.spacing.space_l}; */
  width: 255px;
`;

const MapContainer = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: auto auto auto auto;
`;

class SeatMap extends Component {
  componentDidMount() {
    this.props.subscribeToTicketUpdates();
  }

  render() {
    const {
      availableSeatsCount,
      notAvailableSeats,
      selectedSeats,
      ticketsSelected,
      getSeatStatus,
      onSeatSelection,
    } = this.props;
    return (
      <Container>
        <AvailableSeats seats={availableSeatsCount} />
        <MapContainer>
          {[...Array(SEATS_COUNT)].map((x, i) => {
            const status = getSeatStatus(notAvailableSeats, selectedSeats, i);
            return (
              <Seat
                status={status}
                key={i}
                onClick={() => onSeatSelection(i, status, ticketsSelected)}
              />
            );
          })}
        </MapContainer>
      </Container>
    );
  }
}

export default SeatMap;
