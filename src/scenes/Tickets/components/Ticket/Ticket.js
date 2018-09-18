import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Spring, animated } from 'react-spring';
import Barcode from 'react-barcode';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import seatsIcon from '@fortawesome/fontawesome-free-solid/faTh';
import calendarIcon from '@fortawesome/fontawesome-free-solid/faCalendarAlt';
import clockIcon from '@fortawesome/fontawesome-free-solid/faClock';
import Planet from 'components/Planet';

const Container = styled.div`
  background: ${props => props.theme.colors.blue_dark};
  color: ${props => props.theme.colors.grey_light};
  margin: ${props => props.theme.spacing.space_inset_l};
  border-radius: ${props => props.theme.spacing.space_s};
  width: 350px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0px 0px 50px 1px rgba(255, 255, 255, 0.05);
  cursor: pointer;
`;

const TicketDetails = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`;

const DestinationDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${props => props.theme.spacing.space_inset_l};

  @media (max-width: 370px) {
    margin: ${props => props.theme.spacing.space_inset_m};
  }
`;

const PlanetContainer = styled.div`
  position: absolute;
  right: 32px;
  top: 40%;

  @media (max-width: 370px) {
    top: 45%;
    right: 16px;
  }
`;

const Destination = styled.div`
  font-size: ${props => props.theme.font.h1};
  font-weight: bold;
`;

const SeatContainer = styled.div`
  display: flex;
  align-items: center;
  letter-spacing: 0.1em;
  margin-top: ${props => props.theme.spacing.space_s};
`;

const Seat = styled.div`
  font-size: ${props => props.theme.font.h5};
  color: ${props => props.theme.colors.orange};
  font-weight: bold;
`;

const SeatLabel = styled.div`
  font-size: ${props => props.theme.font.h5};
  color: ${props => props.theme.colors.grey_ligh};
  font-weight: bold;
  letter-spacing: 0.05em;
`;

const Date = styled.div`
  display: flex;
  font-size: ${props => props.theme.font.h5};
  font-weight: bold;
  letter-spacing: 0.1em;
  margin-top: ${props => props.theme.spacing.space_s};
`;

const Time = styled.div`
  display: flex;
  font-size: ${props => props.theme.font.h5};
  font-weight: bold;
  letter-spacing: 0.1em;
  margin-top: ${props => props.theme.spacing.space_s};
`;

const IconContainer = styled.div`
  margin-right: 5px;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BarcodeContainer = styled.div`
  transform: scale(0.75);
`;

const Button = styled.div`
  background: ${props => props.theme.colors.grey_light};
  color: ${props => props.theme.colors.blue_dark};
  padding: ${props => props.theme.spacing.space_inset_s};
  border-radius: ${props => props.theme.spacing.space_s};
  margin-bottom: ${props => props.theme.spacing.space_l};
  font-weight: bold;

  @media (max-width: 370px) {
    margin-bottom: ${props => props.theme.spacing.space_m};
  }
`;

// TODO: move this to config/server
// used also in DepartureSelection/TimeSelection
const times = {
  morning: '5:45AM',
  afternoon: '1:00PM',
  evening: '8:00PM',
};

class Ticket extends Component {
  state = {
    active: false,
  };

  calculatePlanetSize() {
    if (window.innerWidth < 370) {
      return 75;
    }
    return 100;
  }

  render() {
    const {
      destination, date, time, seatNumber, id,
    } = this.props;
    const { active } = this.state;
    const departureDate = moment(date).format('MMM D, YYYY');
    return (
      <Container onClick={() => this.setState({ active: !active })}>
        <TicketDetails>
          <DestinationDetail>
            <Destination>{destination.name.toUpperCase()}</Destination>
            <SeatContainer>
              <IconContainer>
                <FontAwesomeIcon icon={seatsIcon} fixedWidth />
              </IconContainer>
              <SeatLabel>SEAT&nbsp;</SeatLabel>
              <Seat>#{seatNumber}</Seat>
            </SeatContainer>
            <Date>
              <IconContainer>
                <FontAwesomeIcon icon={calendarIcon} fixedWidth />
              </IconContainer>
              {departureDate}
            </Date>
            <Time>
              <IconContainer>
                <FontAwesomeIcon icon={clockIcon} fixedWidth />
              </IconContainer>
              {times[time]}
            </Time>
          </DestinationDetail>
          <PlanetContainer>
            <Planet name={destination.name} size={this.calculatePlanetSize()} />
          </PlanetContainer>
        </TicketDetails>
        <Spring native from={{ height: 'auto' }} to={{ height: 'auto' }}>
          {props => (
            <animated.div style={props}>
              <BottomContainer>
                {active ? (
                  <BarcodeContainer>
                    <Barcode value={id} background="rgba(0,0,0,0)" lineColor="#fff" width={1} />
                  </BarcodeContainer>
                ) : (
                  <Button>VIEW CODE</Button>
                )}
              </BottomContainer>
            </animated.div>
          )}
        </Spring>
      </Container>
    );
  }
}

export default Ticket;
