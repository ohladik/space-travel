import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`;

const Input = styled.input`
  padding: 12px 15px;
  font-size: ${props => props.theme.font.h4};
  color: ${props => props.theme.colors.blue_dark};
  width: 100%;
  border-radius: 5px;
  border: none;

  &::placeholder {
    color: ${props => props.theme.colors.blue_light};
  }
`;

const InputSwitch = styled.span`
  position: absolute;
  display: ${props => (props.type !== 'password' ? 'none' : 'inherit')};
  right: 0;
  top: 0.9em;
  font-size: ${props => props.theme.font.h5};
  font-weight: bold;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

const InputContainer = ({
  placeholder,
  value,
  type,
  passwordVisible,
  togglePasswordVisibility,
  onChange,
  onKeyDown,
}) => (
  <Container>
    <Input
      placeholder={placeholder}
      value={value}
      type={passwordVisible ? 'text' : type}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
    <InputSwitch type={type} onClick={togglePasswordVisibility}>
      {passwordVisible ? 'HIDE' : 'SHOW'}
    </InputSwitch>
  </Container>
);

export default InputContainer;
