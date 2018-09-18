import React, { Component } from 'react';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import QuestionIcon from '@fortawesome/fontawesome-free-solid/faQuestion';
import CrossIcon from '@fortawesome/fontawesome-free-solid/faTimes';

const Container = styled.div``;

const LegendContainer = styled.div`
  position: absolute;
  right: 0;
  background: #fff;
  z-index: 1;
  width: calc(100% - 20px);
  margin: 10px;
  max-width: 380px;
  border-radius: 5px;
  height: 120px;
  box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, 0.2);
`;

const LegendIcon = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 10px;
  right: 10px;
  z-index: 2;
  width: 14px;
  height: 14px;
  border-radius: 12px;
  background: #333333;
  border: 5px solid rgba(255, 255, 255, 0.6);
  background-clip: padding-box;
  color: #fff;
  font-size: 8px;
  cursor: pointer;
`;

const LegendHeader = styled.div`
  margin: 20px;
  font-weight: bold;
`;

const ScaleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Scale = styled.div`
  width: 80%;
  height: 10px;
  border-radius: 5px;
  background: linear-gradient(to right, #009966, #ffde33, #ff9933, #ff9933, #660099, #7e0023);
`;

const ScaleLabelsContainer = styled.div`
  display: flex;
  margin-top: 5px;
  width: 90%;
  justify-content: space-around;
`;

const ScaleLabel = styled.div``;

class Legend extends Component {
  state = {
    legendDisplayed: false,
  };

  toggleLegend = () => {
    this.setState({ legendDisplayed: !this.state.legendDisplayed });
  };

  render() {
    return (
      <Container>
        <LegendIcon onClick={this.toggleLegend}>
          <FontAwesomeIcon icon={this.state.legendDisplayed ? CrossIcon : QuestionIcon} />
        </LegendIcon>
        {this.state.legendDisplayed ? (
          <LegendContainer>
            <LegendHeader>AIR QUALITY INDEX</LegendHeader>
            <ScaleContainer>
              <Scale />
              <ScaleLabelsContainer>
                <ScaleLabel>0</ScaleLabel>
                <ScaleLabel>50</ScaleLabel>
                <ScaleLabel>100</ScaleLabel>
                <ScaleLabel>150</ScaleLabel>
                <ScaleLabel>200</ScaleLabel>
                <ScaleLabel>300+</ScaleLabel>
              </ScaleLabelsContainer>
            </ScaleContainer>
          </LegendContainer>
        ) : null}
      </Container>
    );
  }
}

export default Legend;
