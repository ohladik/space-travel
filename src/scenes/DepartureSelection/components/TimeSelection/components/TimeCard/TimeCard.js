import React from 'react';
import styled from 'styled-components';

const times = {
  morning: '5:45AM',
  afternoon: '1:00PM',
  evening: '8:00PM',
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props =>
    (props.active ? props.theme.colors.grey_light : props.theme.colors.transparent)};
  font-size: ${props => props.theme.font.h5};
  background: ${props =>
    (props.active ? props.theme.colors.purple_medium : props.theme.colors.blue_dark)};
  border-radius: ${props => props.theme.spacing.space_s};
  padding: ${props => props.theme.spacing.space_inset_squish_m};
  margin-right: ${props => props.theme.spacing.space_m};
  cursor: pointer;
`;

const LabelContainer = styled.span``;

const TimeContainer = styled.span``;

const TimeCard = ({ time, active, onClick }) => (
  <Container active={active} onClick={onClick}>
    <LabelContainer>{time.toUpperCase()}</LabelContainer>
    <TimeContainer>{times[time]}</TimeContainer>
  </Container>
);

export default TimeCard;
