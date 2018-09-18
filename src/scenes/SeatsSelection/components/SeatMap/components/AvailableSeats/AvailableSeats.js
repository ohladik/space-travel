import React from 'react';
import styled from 'styled-components';
import Seat from '../Seat';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.grey_light};
  font-size: ${props => props.theme.font.paragraph};
`;

const AvailableSeats = ({ seats }) => (
  <Container>
    <Seat status="available" small />
    {seats} SEATS LEFT
  </Container>
);

export default AvailableSeats;
