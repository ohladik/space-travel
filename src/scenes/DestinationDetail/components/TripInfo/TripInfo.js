import React from 'react';
import styled from 'styled-components';
import TripDetail from './components/TripDetail';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: ${props => props.theme.spacing.space_l};
  margin-right: ${props => props.theme.spacing.space_l};
  margin-bottom: ${props => props.theme.spacing.space_m};
  color: ${props => props.theme.colors.grey_light};
`;

const TripInfo = ({
  tripDuration, temperature, wifiAvailable, kidsFriendly,
}) => (
  <Container>
    <TripDetail type="tripDuration" value={tripDuration} />
    <TripDetail type="temperature" value={temperature} />
    {wifiAvailable ? <TripDetail type="wifiAvailable" value={wifiAvailable} /> : null}
    {kidsFriendly ? <TripDetail type="kidsFriendly" value={kidsFriendly} /> : null}
  </Container>
);

export default TripInfo;
