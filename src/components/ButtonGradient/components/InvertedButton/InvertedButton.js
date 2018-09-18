import React from 'react';
import styled from 'styled-components';

const InvertedButton = styled.button`
  position: relative;
  background: none;
  border: none;
  border-radius: 5px;
  font-size: ${props => props.theme.font.h4};
  font-weight: bold;
  padding: ${props => (props.small ? '4px 18px' : '8px 32px')};
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  overflow: hidden;
  cursor: pointer;
`;

const ButtonBorder = styled.svg`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;

  & .rectangle {
    fill: transparent;
    stroke: url(#border-gradient);
    stroke-width: 4;
  }
`;

const ButtonLabel = styled.svg`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: transparent;
`;

const ButtonContainer = ({
  small, label, onClick, disabled,
}) => (
  <InvertedButton small={small} onClick={disabled ? null : onClick} disabled={disabled}>
    <ButtonBorder xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient
          id="border-gradient"
          gradientUnits="objectBoundingBox"
          gradientTransform="rotate(90, 0.5, 0.5)"
        >
          <stop offset="0%" stopColor="#feb692" />
          <stop offset="25%" stopColor="#feb692" />
          <stop offset="75%" stopColor="#ff566c" />
          <stop offset="100%" stopColor="#ff566c" />
        </linearGradient>
      </defs>
      <rect className="rectangle" x="0" y="0" width="100%" height="100%" rx="5" ry="5" />
    </ButtonBorder>
    <ButtonLabel xmlns="http://www.w3.org/2000/svg">
      <text fill="url(#border-gradient)" textAnchor="middle" dy=".3em">
        <tspan fontSize="18px" x="50%" y="50%">
          {label}
        </tspan>
      </text>
    </ButtonLabel>
    <LabelContainer>{label}</LabelContainer>
  </InvertedButton>
);

export default ButtonContainer;
