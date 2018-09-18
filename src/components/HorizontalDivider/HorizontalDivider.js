import styled from 'styled-components';

const HorizontalDivider = styled.div`
  height: 1px;
  align-self: stretch;
  background-color: ${props => props.theme.colors.transparent};
  margin: ${props => props.theme.spacing.space_l};
`;

export default HorizontalDivider;
