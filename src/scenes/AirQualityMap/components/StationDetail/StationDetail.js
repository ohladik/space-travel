import React, { Component } from 'react';
import styled from 'styled-components';
import { Popup } from 'react-map-gl';
import StationChart from './components/StationChart';

const DetailContainer = styled.div``;

const NameContainer = styled.div`
  font-weight: bold;
`;

const DateContainer = styled.div`
  font-size: 12px;
  color: gray;
`;

class StationDetail extends Component {
  state = {
    stationName: null,
    measurementTime: null,
    measurementData: null,
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.getLocationDetail();
  }

  async getLocationDetail() {
    this.setState({ loading: true });
    const { stationId } = this.props;
    // aqicn token
    const token = 'a17b6fe7aa01fa31a7562cd4ad5d782463ebba13';

    const response = await fetch(`https://api.waqi.info/feed/@${stationId}/?token=${token}`);
    const json = await response.json();
    const { data } = json;
    if (data) {
      this.setState({
        stationName: data.city.name,
        measurementTime: data.time.s,
        measurementData: data.iaqi,
        loading: false,
      });
    } else {
      this.setState({
        loading: false,
        error: 'Station data not available. Please try again later.',
      });
    }
  }

  clearPopupData() {
    this.setState({
      stationName: null,
      measurementTime: null,
      measurementData: null,
      loading: false,
      error: null,
    });
  }

  render() {
    const { latitude, longitude } = this.props;
    const {
      loading, error, stationName, measurementTime, measurementData,
    } = this.state;
    if (loading) {
      return (
        <Popup
          latitude={latitude}
          longitude={longitude}
          closeButton
          anchor="top"
          onClose={() => this.clearPopupData()}
        >
          Loading...
        </Popup>
      );
    }
    if (!error && !measurementData) return null;

    return (
      <Popup
        latitude={latitude}
        longitude={longitude}
        closeButton
        anchor="top"
        onClose={() => this.clearPopupData()}
      >
        <DetailContainer>
          {error}
          <NameContainer>{stationName}</NameContainer>
          <DateContainer>{measurementTime}</DateContainer>
          <StationChart data={measurementData} />
        </DetailContainer>
      </Popup>
    );
  }
}

export default StationDetail;
