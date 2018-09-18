import React from 'react';
import styled from 'styled-components';
import { Marker } from 'react-map-gl';

const MarkerElement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.theme.spacing.space_ml};
  height: ${props => props.theme.spacing.space_ml};
  border-radius: ${props => props.theme.spacing.space_ml};
  background: ${props => props.theme.colors.blue_dark};
  color: ${props => props.theme.colors.grey_light};
  font-size: ${props => props.theme.font.paragraph};

  &::after {
    content: ' ';
    position: absolute;
    z-index: -1;
    width: ${props => props.theme.spacing.space_ml};
    height: ${props => props.theme.spacing.space_ml};
    border-radius: ${props => props.theme.spacing.space_ml};
    background: ${props => props.color};
    pointer-events: none;
    @keyframes wave {
      from {
        opacity: 0.4;
      }
      to {
        transform: scale(3);
        opacity: 0;
      }
    }
    animation: wave 2s ease-out infinite;
  }
`;

const MapMarker = ({ location, onMarkerSelection }) => {
  const {
    latitude, longitude, airQuality, color,
  } = location;
  return (
    <Marker latitude={latitude} longitude={longitude}>
      <MarkerElement color={color} onClick={() => onMarkerSelection(location)}>
        {airQuality}
      </MarkerElement>
    </Marker>
  );
};

export default MapMarker;
