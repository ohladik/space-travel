import React from 'react';
import SolidButton from './components/SolidButton';
import InvertedButton from './components/InvertedButton';

const ButtonGradient = ({
  inverted, small, label, onClick, disabled,
}) =>
  (inverted ? (
    <InvertedButton
      label={label}
      small={small}
      onClick={disabled ? null : onClick}
      disabled={disabled}
    />
  ) : (
    <SolidButton
      small={small}
      onClick={disabled ? null : onClick}
      disabled={disabled}
      label={label}
    />
  ));

export default ButtonGradient;
