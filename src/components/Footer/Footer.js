import React from 'react';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import dribbbleIcon from '@fortawesome/fontawesome-free-brands/faDribbble';
import faIcon from '@fortawesome/fontawesome-free-brands/faFontAwesome';
import githubIcon from '@fortawesome/fontawesome-free-brands/faGithub';
import copyrightIcon from '@fortawesome/fontawesome-free-solid/faCopyright';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  height: 200px;
  margin: 64px;

  @media (max-width: 1100px) {
    flex-direction: column;
    flex-flow: column-reverse;
    justify-content: space-around;
    margin: 32px;
  }
`;

const FooterSection = styled.div``;

const FooterItem = styled.div`
  display: flex;
  margin-top: 16px;
`;

const FooterLink = styled.a`
  color: #fff;
`;

const IconContainer = styled.div`
  margin-right: 5px;
`;

const LabelContainer = styled.div``;

const Footer = () => (
  <Container>
    <FooterSection>
      <FooterItem>
        <IconContainer>
          <FontAwesomeIcon icon={copyrightIcon} />
        </IconContainer>
        <LabelContainer>2018 Ondřej Hladík</LabelContainer>
      </FooterItem>
    </FooterSection>
    <FooterSection>
      <FooterLink
        href="https://dribbble.com/shots/4179344-SPACED"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FooterItem>
          <IconContainer>
            <FontAwesomeIcon icon={dribbbleIcon} />
          </IconContainer>
          <LabelContainer>Design inspiration</LabelContainer>
        </FooterItem>
      </FooterLink>
      <FooterLink href="https://fontawesome.com" target="_blank" rel="noopener noreferrer">
        <FooterItem>
          <IconContainer>
            <FontAwesomeIcon icon={faIcon} />
          </IconContainer>
          <LabelContainer>Font Awesome icons</LabelContainer>
        </FooterItem>
      </FooterLink>
      <FooterLink href="https://github.com/ohladik/space-travel" target="_blank" rel="noopener noreferrer">
        <FooterItem>
          <IconContainer>
            <FontAwesomeIcon icon={githubIcon} />
          </IconContainer>
          <LabelContainer>View source code</LabelContainer>
        </FooterItem>
      </FooterLink>
    </FooterSection>
  </Container>
);

export default Footer;
