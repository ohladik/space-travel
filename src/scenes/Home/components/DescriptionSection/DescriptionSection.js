import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import ButtonGradient from 'components/ButtonGradient';
import Planet from 'components/Planet';

const Container = styled.div`
  margin: ${props => props.theme.spacing.space_l};

  @media (min-width: 600px) {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 72px;
  line-height: 72px;
  color: transparent;
  background-image: linear-gradient(180deg, #feb692 0%, #ff566c 100%);
  -webkit-background-clip: text;
  background-clip: text;

  /* vertical alignment with smaller font size */
  &:first-letter {
    margin-left: -0.08em;
  }
`;

const Subtitle = styled.span`
  font-weight: bold;
  font-size: ${props => props.theme.font.h3};
  color: ${props => props.theme.colors.grey_light};
`;

const Paragraph = styled.p`
  font-size: ${props => props.theme.font.h4};
  color: ${props => props.theme.colors.grey_dark};
  max-width: 350px;
`;

const ButtonContainer = styled.div``;

const PlanetContainer = styled.div`
  z-index: -1;
  padding: 20px;
  transform: translate(150px, -50px);

  @media (min-width: 600px) {
    transform: none;
  }
`;

const DescriptionSection = ({ history }) => (
  <Container>
    <DescriptionContainer>
      <Title>Reach</Title>
      <Subtitle>for a better tomorrow.</Subtitle>
      <Paragraph>
        Terraforming has enabled us to leave the Earth and find a better place for living. You'll
        never want to return back when you see the view from Olympus Mons at Mars.
      </Paragraph>
      <ButtonContainer>
        <ButtonGradient label="Let's Start" onClick={() => history.push('/destinations')} />
      </ButtonContainer>
    </DescriptionContainer>
    <PlanetContainer>
      <Planet name="mars" size={300} />
    </PlanetContainer>
  </Container>
);

const ComponentWithRouter = withRouter(props => <DescriptionSection {...props} />);

export default ComponentWithRouter;
