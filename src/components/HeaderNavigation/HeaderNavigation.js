import React, { Component } from 'react';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import crossIcon from '@fortawesome/fontawesome-free-solid/faTimes';
import menuIcon from '@fortawesome/fontawesome-free-solid/faBars';
import arrowIcon from '@fortawesome/fontawesome-free-solid/faChevronLeft';
import ButtonGradient from 'components/ButtonGradient';
import HeaderItem from './components/HeaderItem';
import { AUTH_TOKEN } from '../../constants';

const Container = styled.div``;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${props => props.theme.spacing.space_l};
  margin-bottom: ${props => props.theme.spacing.space_l};

  @media (max-width: 1100px) {
    width: calc(100% - 2 * 32px);
    height: calc(100% - 2 * 32px);
    margin: 0;
    padding: 32px;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    flex-flow: column-reverse;
    background-color: ${props => props.theme.colors.blue_dark};
    z-index: 9999;
  }
`;

const HeaderSection = styled.div`
  @media (max-width: 1100px) {
    display: flex;
    flex-direction: column;
  }
`;

const MobileIconsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  color: #fff;
  font-size: 24px;
  width: 21px;
  margin-left: ${props => (props.menuOpened ? null : props.theme.spacing.space_l)};
  margin-right: ${props => (props.menuOpened ? null : props.theme.spacing.space_l)};
  margin-top: ${props => (props.menuOpened ? null : props.theme.spacing.space_l)};
  margin-bottom: ${props => (props.menuOpened ? props.theme.spacing.space_l : null)};
  cursor: pointer;

  @media (min-width: 1100px) {
    display: none;
  }
`;

const BackIconContainer = styled.div`
  color: #fff;
  font-size: 24px;
  width: 21px;
  margin-left: ${props => (props.menuOpened ? null : props.theme.spacing.space_l)};
  margin-right: ${props => (props.menuOpened ? null : props.theme.spacing.space_l)};
  margin-top: ${props => (props.menuOpened ? null : props.theme.spacing.space_l)};
  margin-bottom: ${props => (props.menuOpened ? props.theme.spacing.space_l : null)};
  cursor: pointer;
`;

const HorizontalDivider = styled.div`
  width: 95%;
  max-width: 250px;
  height: 1px;
  margin-top: ${props => props.theme.spacing.space_l};
  background-color: rgba(255, 255, 255, 0.2);

  @media (min-width: 1100px) {
    display: none;
  }
`;

// routes where will be the menu icon be replaced by back arrow icon
const fullscreenRoutes = ['destination', 'departure', 'seats', 'checkout'];

class Header extends Component {
  state = {
    mobile: false,
    opened: false,
  };

  componentDidMount() {
    this.listener = this.isMobile.bind(this);
    window.addEventListener('resize', this.listener);

    // initial check
    this.isMobile();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.listener);
  }

  isMobile = () => this.setState({ mobile: window.innerWidth < 1100 });

  toggleMenu = () => this.setState({ opened: !this.state.opened });

  menuItemSelected = () => this.setState({ opened: false });

  logoutUser = () => {
    this.menuItemSelected();
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem('userId');
    this.props.history.push('/home');
  };

  navigateToRegistration = () => {
    this.menuItemSelected();
    this.props.history.push('/register');
  };

  isFullscreen = (path) => {
    const location = path.split('/')[1];

    return fullscreenRoutes.indexOf(location) !== -1;
  };

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    if (this.state.mobile && !this.state.opened) {
      // if in destination detail, departure selection, seat selection or trip overview
      // display back arrow instead of the menu icon
      // clicking on this icon will move back to the previous location
      if (this.isFullscreen(this.props.location.pathname)) {
        return (
          <MobileIconsContainer>
            <IconContainer onClick={this.props.history.goBack}>
              <FontAwesomeIcon icon={arrowIcon} />
            </IconContainer>
            <IconContainer onClick={() => this.props.history.push('/destinations')}>
              <FontAwesomeIcon icon={crossIcon} />
            </IconContainer>
          </MobileIconsContainer>
        );
      }
      return (
        <IconContainer onClick={this.toggleMenu} menuOpened={this.state.opened}>
          <FontAwesomeIcon icon={menuIcon} />
        </IconContainer>
      );
    }
    return (
      <Container>
        <HeaderContainer>
          <HeaderSection>
            <HeaderItem label="Home" link="/home" onSelection={this.menuItemSelected} />
            <HeaderItem
              label="Destinations"
              link="/destinations"
              onSelection={this.menuItemSelected}
            />
            {authToken ? (
              <HeaderItem label="Tickets" link="/tickets" onSelection={this.menuItemSelected} />
            ) : null}
            <HeaderItem
              label="Air Quality"
              link="/airquality"
              onSelection={this.menuItemSelected}
            />
            <HeaderItem label="Spaceport" link="/routes" onSelection={this.menuItemSelected} />
          </HeaderSection>
          <HorizontalDivider />
          {authToken ? (
            <HeaderSection>
              <HeaderItem
                label="Logout"
                link="/home"
                onSelection={this.logoutUser}
                disableHighlight
              />
            </HeaderSection>
          ) : (
            <HeaderSection>
              <ButtonGradient
                label="Create Account"
                inverted
                small={this.state.mobile}
                backgroundColor="#1D1539"
                onClick={this.navigateToRegistration}
              />
              <HeaderItem
                label="Sign In"
                link="/login"
                onSelection={this.menuItemSelected}
                disableHighlight
              />
            </HeaderSection>
          )}
          <IconContainer onClick={this.toggleMenu} menuOpened={this.state.opened}>
            <FontAwesomeIcon icon={crossIcon} />
          </IconContainer>
        </HeaderContainer>
        {/* display back icon when the scene is fullscreen */}
        {this.isFullscreen(this.props.location.pathname) ? (
          <BackIconContainer onClick={this.props.history.goBack}>
            <FontAwesomeIcon icon={arrowIcon} />
          </BackIconContainer>
        ) : null}
      </Container>
    );
  }
}

export default Header;
