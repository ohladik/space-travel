import React from 'react';
import styled from 'styled-components';

import DescriptionSection from './components/DescriptionSection';
import ExploreSection from './components/ExploreSection';

const Container = styled.div`
  overflow-x: hidden;
`;

const Home = () => (
  <Container>
    <DescriptionSection />
    <ExploreSection />
  </Container>
);

export default Home;
