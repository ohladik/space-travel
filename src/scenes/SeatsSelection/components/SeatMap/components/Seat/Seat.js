import React from 'react';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';

// TODO: 3 states - available, not available, selected
// TODO: Create common style for all seats and reuse it

const SeatAvailable = styled.div`
  background-color: ${props => props.theme.colors.purple_light};
  height: ${props => (props.small ? props.theme.spacing.space_ml : props.theme.spacing.space_l)};
  width: ${props => (props.small ? props.theme.spacing.space_ml : props.theme.spacing.space_l)};
  margin: 10px;
  border-radius: ${props => props.theme.spacing.space_xs};
  cursor: pointer;
`;

const SeatNotAvailable = styled.div`
  height: ${props => props.theme.spacing.space_l};
  width: ${props => props.theme.spacing.space_l};
  margin: 10px;
  border-width: 1px;
  border-style: solid;
  border-radius: ${props => props.theme.spacing.space_xs};
  border-color: ${props => props.theme.colors.purple_light};
`;

const SeatSelected = styled.div`
  background-color: ${props => props.theme.colors.grey_light};
  height: ${props => props.theme.spacing.space_l};
  width: ${props => props.theme.spacing.space_l};
  margin: 10px;
  border-radius: ${props => props.theme.spacing.space_xs};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SeatContainer = {
  available: SeatAvailable,
  notAvailable: SeatNotAvailable,
  selected: SeatSelected,
};

const Seat = ({ status, small, onClick }) => {
  const Container = SeatContainer[status];
  return (
    <Container onClick={onClick} small={small}>
      {status === 'selected' ? <FontAwesomeIcon icon={faCheck} /> : null}
    </Container>
  );
};

export default Seat;
