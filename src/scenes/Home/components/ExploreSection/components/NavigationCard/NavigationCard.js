import React from 'react';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faChevronRight from '@fortawesome/fontawesome-free-solid/faChevronRight';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 230px;
  background-image: ${props => `url(${props.background})`};
  background-size: cover;
  margin-top: 20px;
  border-radius: 5px;
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(black, black);
    opacity: 0.6;
  }

  @media (min-width: 600px) {
    margin-right: 30px;
  }
`;

const CardDescription = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 3;
  color: #fff;
  margin: 32px;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

const Description = styled.span`
  margin-top: 6px;
  color: #c6c6c6;
`;

const IconContainer = styled.div`
  z-index: 3;
  color: #fff;
  margin: 32px;
  align-self: flex-end;
`;

const NavigationCard = ({ title, description, image }) => (
  <Container background={image}>
    <CardDescription>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </CardDescription>
    <IconContainer>
      <FontAwesomeIcon icon={faChevronRight} />
    </IconContainer>
  </Container>
);

export default NavigationCard;
