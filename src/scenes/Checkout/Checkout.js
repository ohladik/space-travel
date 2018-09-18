import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPay from '@fortawesome/fontawesome-free-brands/faApplePay';
import Planet from 'components/Planet';
import { TAX_RATE } from 'constants.js';
import OverviewItem from './components/OverviewItem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${props => props.theme.spacing.space_inset_l};

  @media (max-width: 1100px) {
    margin-top: ${props => props.theme.spacing.space_m};
    margin-bottom: ${props => props.theme.spacing.space_m};
  }
`;

const DestinationSubtitle = styled.span`
  font-size: ${props => props.theme.font.h5};
  color: ${props => props.theme.colors.orange};
`;

const DestinationTitle = styled.span`
  font-size: ${props => props.theme.font.h1};
  font-weight: 600;
  color: ${props => props.theme.colors.grey_light};
`;

const OverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${props => props.theme.spacing.space_inset_l};
  border-radius: ${props => props.theme.spacing.space_s};
  font-size: ${props => props.theme.font.h5};
  overflow: hidden;
  background: #fff;
  max-width: 400px;

  @media (max-width: 1100px) {
    margin-top: ${props => props.theme.spacing.space_m};
    margin-bottom: ${props => props.theme.spacing.space_m};
  }
`;

const OverviewTitle = styled.div`
  padding: ${props => props.theme.spacing.space_m};
  font-weight: 600;
  font-size: ${props => props.theme.font.h4};
  background: #fafaff;
`;

const CheckoutButton = styled.button`
  padding: ${props => props.theme.spacing.space_s};
  font-size: ${props => props.theme.font.h1};
  border: none;
  background: #fff;
  cursor: pointer;
  opacity: 1;

  @keyframes button-animation {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.2;
    }
    100% {
      opacity: 1;
    }
  }

  animation: ${props => (props.animate ? 'button-animation 1s infinite' : null)};
`;

const PlanetContainer = styled.div`
  display: none;

  @media (min-width: 1100px) {
    display: inherit;
    max-height: none;
    transform: none;
    position: absolute;
    top: 100px;
    left: 600px;
  }
`;

class Checkout extends Component {
  state = {
    screenWidth: window.innerWidth,
    processingPayment: false,
    paymentSuccessful: false,
  };

  componentDidMount() {
    this.listener = this.updateScreenWidth.bind(this);
    window.addEventListener('resize', this.listener);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.listener);
    // data can't be reset in processPayment because of transition animation
    // where this component unmounts with a timeout and some props would be undefined
    if (this.state.paymentSuccessful) {
      this.props.resetDestinationForm();
    }
  }

  updateScreenWidth = () => this.setState({ screenWidth: window.innerWidth });

  calculatePlanetSize = () => {
    if (this.state.screenWidth < 1100) {
      return this.state.screenWidth * 2;
    }
    return this.state.screenWidth / 3;
  };

  processPayment = () => {
    this.setState({ processingPayment: true });
    setTimeout(() => {
      this.setState({ processingPayment: false, paymentSuccessful: true });
      this.props.onPaymentSuccess();
      this.props.history.push('/tickets');
    }, 2000);
  };

  render() {
    const {
      destinationName, departureDate, departureTime, ticketPrice, tickets,
    } = this.props;

    return (
      <Container>
        <HeaderContainer>
          <DestinationSubtitle>YOUR TRIP TO</DestinationSubtitle>
          <DestinationTitle>{destinationName.toUpperCase()}</DestinationTitle>
        </HeaderContainer>
        <OverviewContainer>
          <OverviewTitle>OVERVIEW</OverviewTitle>
          <OverviewItem label="Destination" value={destinationName} />
          <OverviewItem label="Date" value={departureDate} />
          <OverviewItem label="Departure" value={departureTime} />
          <OverviewItem
            label={tickets.length > 1 ? 'Seat numbers' : 'Seat number'}
            value={tickets
              .map(ticket => ticket.seatId)
              .sort((a, b) => a - b)
              .join(', ')}
          />
          <OverviewItem
            label={tickets.length > 1 ? `${tickets.length} seats @` : '1 seat @'}
            value={`$${tickets.length * ticketPrice}`}
            valueBold
          />
          <OverviewItem
            label="Tax"
            value={`$${Math.round(tickets.length * ticketPrice * TAX_RATE).toString()}`}
            valueBold
          />
          <OverviewItem
            label="Total"
            value={`$${Math.round(tickets.length * ticketPrice * (1 + TAX_RATE)).toString()}`}
            labelBold
            valueBold
          />
          <CheckoutButton onClick={this.processPayment} animate={this.state.processingPayment}>
            <FontAwesomeIcon icon={faPay} />
          </CheckoutButton>
        </OverviewContainer>
        <PlanetContainer>
          <Planet name={destinationName} size={this.calculatePlanetSize()} />
        </PlanetContainer>
      </Container>
    );
  }
}

const RESET_FORM_MUTATION = gql`
  mutation ResetForm {
    resetDestinationForm @client
  }
`;

const CheckoutWithRouter = withRouter(props => <Checkout {...props} />);

export default compose(graphql(RESET_FORM_MUTATION, { name: 'resetDestinationForm' }))(CheckoutWithRouter);
