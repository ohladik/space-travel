import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.space_m};
  border-bottom: 1px solid ${props => props.theme.colors.grey_light};
  &:last-child {
    border-bottom: none;
  }
  &:nth-child(-n + 5) {
    background: #fafaff;
  }
`;

const Label = styled.span`
  font-weight: 600;
  color: ${props => (props.bold ? props.theme.colors.blue_dark : props.theme.colors.blue_light)};
`;

const Value = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.blue_dark};
  font-size: ${props => (props.bold ? props.theme.font.h4 : props.theme.font.h5)};
`;

const OverviewItem = ({
  label, value, labelBold, valueBold,
}) => (
  <Container>
    <Label bold={labelBold}>{label.toUpperCase()}</Label>
    <Value bold={valueBold}>{value.toUpperCase()}</Value>
  </Container>
);

export default OverviewItem;
