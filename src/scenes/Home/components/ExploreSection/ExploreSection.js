import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import NavigationCard from './components/NavigationCard';
import landscapeImage from './landscape.jpg';
import tunnelImage from './tunnel.jpg';
import wormholeImage from './wormhole.jpg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${props => props.theme.spacing.space_l};
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 24px;
  margin-left: 0.16em;
  color: transparent;
  background-image: linear-gradient(180deg, #feb692 0%, #ff566c 100%);
  -webkit-background-clip: text;
  background-clip: text;

  @media (min-width: 600px) {
    align-self: center;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 600px) {
    flex-direction: row;
    flex-wrap: wrap;
  }

  @media (min-width: 1070px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const ExploreSection = () => (
  <Container>
    <Title>Explore</Title>
    <CardsContainer>
      <Link to="/airquality">
        <NavigationCard
          title="AIR QUALITY"
          description="Check the air pollution at your location. PM2.5, PM1, NO2, SO2, all that stuff."
          image={landscapeImage}
        />
      </Link>
      <Link to="/routes">
        <NavigationCard
          title="SPACEPORT CONNECTION"
          description="Long back are the days when you spent hours in the bus. Boring advancements have helped to make travelling great again."
          image={tunnelImage}
        />
      </Link>
      <Link to="/destinations">
        <NavigationCard
          title="DESTINATIONS"
          description="We offer connections to all the planets in the Solar System. And even Pluto."
          image={wormholeImage}
        />
      </Link>
    </CardsContainer>
  </Container>
);

export default ExploreSection;
