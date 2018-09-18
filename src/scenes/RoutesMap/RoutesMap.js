import React, { Component } from 'react';
import styled from 'styled-components';
import MapGL from 'react-map-gl';
import DeckGLOverlay from './deckgl-overlay.js';
import STATIONS from './stations';
import ROUTES from './routes';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;

// maximal width of the map in pixels
const MAX_MAP_WIDTH = 1336;

// minimal height of the map in pixels
const MIN_MAP_HEIGHT = 400;

const MapContainer = styled.div`
  position: relative;
  border-radius: ${props => props.theme.spacing.space_s};
  overflow: hidden;
`;

const TooltipContainer = styled.div`
  position: absolute;
  background: ${props => props.theme.colors.grey_light};
  color: ${props => props.theme.colors.blue_dark};
  margin: ${props => props.theme.spacing.space_s};
  padding: ${props => props.theme.spacing.space_s};
  border-radius: ${props => props.theme.spacing.space_s};
  left: ${props => `${props.position.x}px`};
  top: ${props => `${props.position.y}px`};
  pointer-events: none;
  z-index: 1;
`;

const Container = styled.div`
  margin: ${props => props.theme.spacing.space_l};
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

class RoutesMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        ...DeckGLOverlay.defaultViewport,
        width: document.body.scrollWidth - 64,
        height: window.innerWidth > 1100 ? 800 : MIN_MAP_HEIGHT,
      },
      routes: ROUTES,
      stations: STATIONS,
      hoveredObject: null,
    };
  }

  componentDidMount() {
    // TODO: remove event listener in ComponentWillUnmount
    this.listener = this._resize.bind(this);
    window.addEventListener('resize', this.listener);

    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.listener);
  }

  _resize() {
    this._onViewportChange({
      width: this._calculateMapWidth(document.body.scrollWidth),
      height: this._calculateMapHeight(window.innerHeight),
    });
  }

  _calculateMapWidth = screenWidth =>
    (screenWidth - 64 > MAX_MAP_WIDTH ? MAX_MAP_WIDTH : screenWidth - 64);

  _calculateMapHeight = screenHeight =>
    (screenHeight - 250 > MIN_MAP_HEIGHT ? screenHeight - 250 : MIN_MAP_HEIGHT);

  _onViewportChange(viewport) {
    // update viewport and hide tooltip activated on mobile
    this.setState({
      viewport: { ...this.state.viewport, ...viewport },
      hoveredObject: null,
    });
  }

  _renderTooltip() {
    const { x, y, hoveredObject } = this.state;

    if (!hoveredObject) {
      return null;
    }

    return <TooltipContainer position={{ x, y }}>{hoveredObject.name}</TooltipContainer>;
  }

  _onHover({ x, y, object }) {
    this.setState({ x, y, hoveredObject: object });
  }

  render() {
    const { viewport, routes, stations } = this.state;

    return (
      <Container>
        <Header>Routes</Header>
        <Subtitle>Find a Hyperloop connection to our launch site in Prague.</Subtitle>
        <MapContainer>
          {this._renderTooltip()}
          <MapGL
            {...viewport}
            mapStyle="mapbox://styles/onhladik/cjh686uf74vvt2qm9d0azd0jo"
            onViewportChange={this._onViewportChange.bind(this)}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          >
            <DeckGLOverlay
              viewport={viewport}
              strokeWidth={6}
              routes={routes}
              stations={stations}
              onHover={this._onHover.bind(this)}
            />
          </MapGL>
        </MapContainer>
      </Container>
    );
  }
}

export default RoutesMap;
