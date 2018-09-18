import React from 'react';
import Planet from 'components/Planet';
import styled from 'styled-components';

const ScrollWrapper = styled.div`
  display: inline-block;

  @media (min-width: 1100px) {
    margin-bottom: ${props => props.theme.spacing.space_l};
  }
`;

const CardContainer = styled.div`
  flex: 1 0 auto;
  border-radius: ${props => props.theme.spacing.space_s};
  background: ${props => props.theme.colors.blue_dark};
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 350px;
  overflow: hidden;
`;

const DestinationTitle = styled.span`
  margin-left: ${props => props.theme.spacing.space_l};
  margin-top: ${props => props.theme.spacing.space_l};
  font-size: ${props => props.theme.font.h1};
  font-weight: bold;
  color: ${props => props.theme.colors.grey_light};
`;

const DestinationSubtitle = styled.span`
  margin-left: ${props => props.theme.spacing.space_l};
  color: ${props => props.theme.colors.orange};
  font-size: ${props => props.theme.font.h5};
`;

const PlanetContainer = styled.div`
  align-self: center;
  transform: translateY(50px);
`;

const PriceContainer = styled.div`
  margin-left: 2.2rem;
  margin-top: 6px;
  border-left: solid 1px;
  border-color: ${props => props.theme.colors.orange};
`;

const PriceLabel = styled.span`
  font-weight: bold;
  letter-spacing: 0.05em;
  margin-left: 4px;
  font-size: ${props => props.theme.font.h5};
  color: ${props => props.theme.colors.grey_light};
`;

const DestinationCard = ({ destination: { name, descriptionShort, ticketPrice } }) => (
  <ScrollWrapper>
    <CardContainer>
      <DestinationTitle>{name.toUpperCase()}</DestinationTitle>
      <DestinationSubtitle>{descriptionShort.toUpperCase()}</DestinationSubtitle>
      <PriceContainer>
        <PriceLabel>{`$${ticketPrice}`}</PriceLabel>
      </PriceContainer>
      <PlanetContainer>
        <Planet name={name} />
      </PlanetContainer>
    </CardContainer>
  </ScrollWrapper>
);

export default DestinationCard;
