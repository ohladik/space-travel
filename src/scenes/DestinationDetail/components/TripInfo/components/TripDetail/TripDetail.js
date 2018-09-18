import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faWifi from '@fortawesome/fontawesome-free-solid/faWifi';
import faChild from '@fortawesome/fontawesome-free-solid/faChild';
import faThermometerEmpty from '@fortawesome/fontawesome-free-solid/faThermometerEmpty';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 0 50%;
  color: ${props => props.theme.colors.grey_light};
  font-size: ${props => props.theme.font.paragraph};
  margin-bottom: ${props => props.theme.spacing.space_xs};
`;

const ValueContainer = styled.span`
  margin-left: ${props => props.theme.spacing.space_s};
`;

const icons = {
  tripDuration: faClock,
  wifiAvailable: faWifi,
  kidsFriendly: faChild,
  temperature: faThermometerEmpty,
};

const getLabel = (type, value) => {
  switch (type) {
    case 'tripDuration':
      return `${value}H FLIGHT`;
    case 'wifiAvailable':
      return 'WIFI READY';
    case 'kidsFriendly':
      return 'KIDS FRIENDLY';
    case 'temperature':
      return `${value}° C`;
    default:
      return '';
  }
};

const TripDetail = ({ type, value }) => (
  <Container>
    <FontAwesomeIcon icon={icons[type]} fixedWidth />
    <ValueContainer>{getLabel(type, value)}</ValueContainer>
  </Container>
);

export default TripDetail;
