import React, { Component } from 'react';
import { setParameters } from 'luma.gl';
import DeckGL, { LineLayer, ScatterplotLayer } from 'deck.gl';

function getColor(d) {
  const z = d.start[2];
  const r = z / 10000;

  return [255 * (1 - r * 2), 128 * r, 255 * r, 255 * (1 - r)];
}

function getSize(type) {
  if (type.search('major') >= 0) {
    return 100;
  }
  if (type.search('small') >= 0) {
    return 30;
  }
  return 60;
}

export default class DeckGLOverlay extends Component {
  static get defaultViewport() {
    return {
      latitude: 50.0755,
      longitude: 14.4378,
      zoom: 4.5,
      maxZoom: 16,
      bearing: 0,
    };
  }

  _initialize(gl) {
    setParameters(gl, {
      blendFunc: [gl.SRC_ALPHA, gl.ONE, gl.ONE_MINUS_DST_ALPHA, gl.ONE],
      blendEquation: gl.FUNC_ADD,
    });
  }

  render() {
    const {
      viewport, routes, stations, strokeWidth,
    } = this.props;

    if (!routes || !stations) {
      return null;
    }

    const layers = [
      new ScatterplotLayer({
        id: 'airports',
        data: stations,
        radiusScale: 20,
        getPosition: d => d.coordinates,
        getColor: d => [255, 140, 0],
        getRadius: d => getSize(d.type),
        pickable: Boolean(this.props.onHover),
        onHover: this.props.onHover,
      }),
      new LineLayer({
        id: 'flight-paths',
        data: routes,
        strokeWidth,
        fp64: false,
        getSourcePosition: d => d.start,
        getTargetPosition: d => d.end,
        getColor,
        pickable: Boolean(this.props.onHover),
        onHover: this.props.onHover,
      }),
    ];

    return <DeckGL {...viewport} layers={layers} onWebGLInitialized={this._initialize} />;
  }
}
