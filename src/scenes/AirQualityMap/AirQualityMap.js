import React, { Component } from 'react';
import styled from 'styled-components';
import MapGL from 'react-map-gl';
import HeatmapOverlay from 'react-map-gl-heatmap-overlay';
import debounce from 'lodash.debounce';
import { scaleLinear } from 'd3-scale';
import { List } from 'immutable';
import MapMarker from './components/MapMarker';
import Legend from './components/Legend';
import StationDetail from './components/StationDetail';

// threshold of stations on the map where markers will be replaced by heatmap layer
const HEATMAP_DATA_THRESHOLD = 20;

// maximal width of the map in pixels
const MAX_MAP_WIDTH = 1336;

// minimal height of the map in pixels
const MIN_MAP_HEIGHT = 400;

const getMarkercolor = scaleLinear()
  .domain([0, 50, 100, 150, 200, 300])
  .range(['#009966', '#FFDE33', '#FF9933', '#FF9933', '#660099', '#7E0023']);

const getHeatmapIntensity = scaleLinear()
  .domain([0, 50, 100, 150, 200, 300])
  .range([0, 0.05]);

const getHeatmapSize = scaleLinear()
  .domain([0, 50, 100, 150, 200, 300])
  .range([30, 40]);

const Container = styled.div`
  margin: ${props => props.theme.spacing.space_l};
`;

const MapContainer = styled.div`
  position: relative;
  border-radius: ${props => props.theme.spacing.space_s};
  overflow: hidden;
`;

const Header = styled.div`
  color: ${props => props.theme.colors.grey_light};
  font-size: ${props => props.theme.font.h1};
  font-weight: bold;

  @media (min-width: 1100px) {
    display: none;
  }
`;

const Subtitle = styled.div`
  margin-bottom: ${props => props.theme.spacing.space_s};
  color: ${props => props.theme.colors.grey_light};
  font-size: ${props => props.theme.font.h4};

  @media (min-width: 1100px) {
    display: none;
  }
`;

class AirQualityMap extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();

    // Debounce network request
    this.getAirQualityData = debounce(this.getAirQualityData, 300);
  }

  state = {
    data: null,
    selectedLocation: null,
    bounds: [50, 14, 51, 15],
    viewport: {
      width: document.body.scrollWidth - 64,
      height: window.innerWidth > 1100 ? 800 : 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8,
    },
  };

  componentDidMount() {
    this.listener = this.resize.bind(this);
    window.addEventListener('resize', this.listener);

    this.resize();
    this.getCurrentPosition();
    this.getAirQualityData();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.listener);
  }

  getCurrentPosition() {
    // Note - available only on HTTPS
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.setState({ viewport: { ...this.state.viewport, latitude, longitude } });
    });
  }

  async getAirQualityData() {
    try {
      // aqicn token
      const token = process.env.REACT_APP_AQICN_API_KEY;

      const response = await fetch(`https://api.waqi.info/map/bounds/?latlng=${this.state.bounds}&token=${token}`);
      const json = await response.json();
      const { data } = json;

      const locations = data
        // filter out stations with no current air quality data
        .filter(result => result.aqi !== '-')
        .map(location => ({
          longitude: location.lon,
          latitude: location.lat,
          color: this.calculateMarkerColor(parseInt(location.aqi, 10)),
          airQuality: location.aqi,
          uid: location.uid,
        }));

      this.setState({ data: locations });
    } catch (e) {
      console.log(e);
    }
  }

  calculateMapWidth = screenWidth =>
    (screenWidth - 64 > MAX_MAP_WIDTH ? MAX_MAP_WIDTH : screenWidth - 64);

  calculateMapHeight = screenHeight =>
    (screenHeight - 250 > MIN_MAP_HEIGHT ? screenHeight - 250 : MIN_MAP_HEIGHT);

  calculateMarkerColor(airQuality) {
    return getMarkercolor(airQuality);
  }

  handleViewportChange(viewport) {
    let { bounds } = this.state;
    if (this.mapRef.current) {
      const currentBounds = this.mapRef.current.getMap().getBounds();
      const boundsNE = currentBounds._ne;
      const boundsSW = currentBounds._sw;
      bounds = [boundsSW.lat, boundsSW.lng, boundsNE.lat, boundsNE.lng];
    }
    const newViewport = {
      width: this.calculateMapWidth(document.body.scrollWidth),
      height: this.calculateMapHeight(window.innerHeight),
    };
    this.getAirQualityData();
    this.setState({ viewport: { ...this.state.viewport, ...viewport }, bounds });
  }

  resize() {
    this.handleViewportChange({
      width: this.calculateMapWidth(document.body.scrollWidth),
      height: this.calculateMapHeight(window.innerHeight),
    });
  }

  handleMarkerSelection = (location) => {
    this.setState({ selectedLocation: location });
  };

  renderMarkers() {
    if (this.state.data) {
      return this.state.data.map(location => (
        <MapMarker
          location={location}
          onMarkerSelection={this.handleMarkerSelection}
          key={location.uid}
        />
      ));
    }
    return null;
  }

  renderStationDetail() {
    if (this.state.selectedLocation) {
      const { latitude, longitude, uid } = this.state.selectedLocation;

      return (
        <StationDetail
          latitude={latitude}
          longitude={longitude}
          stationId={uid}
          key={`popup${uid}`}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <Container>
        <Header>Air Quality</Header>
        <Subtitle>Discover what you are breathing.</Subtitle>
        <MapContainer>
          <Legend />
          <MapGL
            ref={this.mapRef}
            mapboxApiAccessToken="pk.eyJ1Ijoib25obGFkaWsiLCJhIjoiY2pndjkzYnJxMWk5MjJ4cDNkNXJzNjBnZiJ9.pq2k5Sc55WI73hsykNMvXA"
            {...this.state.viewport}
            onViewportChange={this.handleViewportChange.bind(this)}
          >
            {this.state.data && this.state.data.length > HEATMAP_DATA_THRESHOLD ? (
              <HeatmapOverlay
                locations={this.state.data}
                {...this.state.viewport}
                lngLatAccessor={location => [location.longitude, location.latitude]}
                intensityAccessor={location => getHeatmapIntensity(location.airQuality)}
                sizeAccessor={location => getHeatmapSize(location.airQuality)}
                gradientColors={List([
                  '#009966',
                  '#ffde33',
                  '#ff9933',
                  '#ff9933',
                  '#660099',
                  '#7e0023',
                ])}
              />
            ) : (
              [this.renderMarkers(), this.renderStationDetail()]
            )}
          </MapGL>
        </MapContainer>
      </Container>
    );
  }
}

export default AirQualityMap;
