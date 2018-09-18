import React from 'react';
import { withRouter } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faChevronRight from '@fortawesome/fontawesome-free-solid/faChevronRight';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  background: ${props =>
    (props.buttonDisabled ? props.theme.colors.transparent : props.theme.colors.grey_light)};
  border-radius: ${props => props.theme.spacing.space_s};
  border: none;
  align-self: flex-start;
  padding: ${props => props.theme.spacing.space_inset_squish_m};
  cursor: pointer;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: ${props => props.theme.font.h4};
  font-weight: bold;
  color: ${props => (props.buttonDisabled ? props.theme.colors.grey_light : 'inherit')};
`;

const IconContainer = styled.div`
  margin-left: 22px;
  font-size: 16px;
`;

const Button = ({
  label, showArrow, history, path, disabled, onClick,
}) => {
  if (!onClick) {
    onClick = () => {};
  }
  return (
    <StyledButton
      buttonDisabled={disabled}
      onClick={() => (!disabled ? history.push(path) : onClick())}
    >
      <LabelContainer>{label}</LabelContainer>
      {showArrow ? (
        <IconContainer>
          <FontAwesomeIcon icon={faChevronRight} />
        </IconContainer>
      ) : null}
    </StyledButton>
  );
};

const ButtonWithRouter = withRouter(props => <Button {...props} />);

export default ButtonWithRouter;
