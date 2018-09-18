import React from 'react';
import styled from 'styled-components';

const SolidButton = styled.button`
  position: relative;
  border: 2px solid transparent;
  border-radius: ${props => props.theme.spacing.space_xs};
  background: linear-gradient(180deg, #feb692 0%, #ff566c 100%);
  background-clip: padding-box;
  color: ${props => props.theme.colors.blue_dark};
  font-size: ${props => props.theme.font.h4};
  font-weight: bold;
  padding: ${props => (props.small ? props.theme.spacing.space_inset_xs : '4px 32px')};
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  cursor: pointer;

  @media (min-width: 1100px) {
    background: linear-gradient(180deg, #feb692 0%, #ff566c 100%);
    background-clip: padding-box;
  }

  &:after {
    position: absolute;
    top: -2px;
    bottom: -2px;
    left: -2px;
    right: -2px;
    background: linear-gradient(180deg, #feb692 0%, #ff566c 100%);
    content: '';
    z-index: -1;
    border-radius: ${props => props.theme.spacing.space_xs};
    opacity: ${props => (props.disabled ? 0.2 : 1)};
  }
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(180deg, #feb692 0%, #ff566c 100%);
  background-clip: text;
  -webkit-background-clip: text;
`;

const ButtonContainer = ({
  small, label, onClick, disabled,
}) => (
  <SolidButton small={small} onClick={disabled ? null : onClick} disabled={disabled}>
    <LabelContainer>{label}</LabelContainer>
  </SolidButton>
);

export default ButtonContainer;
