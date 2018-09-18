import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import styled from 'styled-components';

const activeClassName = 'nav-item-active';

const StyledHeaderItem = styled(NavLink).attrs({
  activeClassName,
})`
  text-decoration: none;
  margin: ${props => props.theme.spacing.space_l};
  font-size: ${props => props.theme.font.h4};
  font-weight: bold;
  color: ${props => props.theme.colors.grey_light};

  &.${activeClassName} {
    color: transparent;
    background-image: linear-gradient(180deg, #feb692 0%, #ff566c 100%);
    -webkit-background-clip: text;
    background-clip: text;
  }

  &:hover {
    color: ${props => props.theme.colors.transparent};
    background-image: none;
  }

  @media (max-width: 1100px) {
    margin: 0;
    margin-top: ${props => props.theme.spacing.space_l};
  }
`;

const HeaderItem = ({
  label, link, onSelection, disableHighlight,
}) => (
  <StyledHeaderItem
    activeClassName={disableHighlight ? null : activeClassName}
    to={link}
    onClick={onSelection}
  >
    {label}
  </StyledHeaderItem>
);

export default withRouter(HeaderItem);
