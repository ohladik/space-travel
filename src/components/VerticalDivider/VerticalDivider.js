import styled from 'styled-components';

const VerticalDivider = styled.div`
  width: 1px;
  align-self: stretch;
  background-color: ${props => props.theme.colors.grey_medium};
`;

export default VerticalDivider;
