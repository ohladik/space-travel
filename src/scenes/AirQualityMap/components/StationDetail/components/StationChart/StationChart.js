import React, { Component } from 'react';
import styled from 'styled-components';
import { Group } from '@vx/group';
import { Bar } from '@vx/shape';
import { scaleLinear, scaleBand } from '@vx/scale';
import { Text } from '@vx/text';

const ChartContainer = styled.div`
  width: 200px;
  transform: rotateZ(90deg);
`;

// undefined key falls back to blue (done by the vx library)
const colors = {
  h: '#000',
  p: '#000',
  t: '#000',
  no2: '#EB5757',
  o3: '#F2994A',
  pm10: '#F2C94C',
  pm25: '#2F80ED',
  so2: '#BB6BD9',
  w: '#56CCF2',
  wg: '#6FCF97',
};

// Define the graph dimensions and margins
const width = 170;
const height = 200;
// top and bottom make space for labels
const margin = {
  top: 30,
  bottom: 20,
  left: 5,
  right: 5,
};

// create bounds
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

// create helpers to get needed data
const x = d => d.name;
const y = d => +d.value * 100;

class StationChart extends Component {
  state = {
    barHeight: null,
  };

  componentDidUpdate() {
    if (!this.state.barHeight) {
      this.getBarHeight();
    }
  }

  getBarHeight() {
    if (this.barElement) {
      const barHeight = this.barElement.getBBox().width;
      this.setState({ barHeight });
    }
  }

  transformData(data) {
    const transformedData = Object.entries(data)
      .map(measurement => ({
        name: measurement[0],
        value: Math.round(measurement[1].v),
      }))
      // filter out pressure
      .filter(value => value.name !== 'p');

    return transformedData;
  }

  render() {
    if (this.props.data) {
      const data = this.transformData(this.props.data);
      // scale the graph using the data
      const xScale = scaleBand({
        rangeRound: [0, xMax],
        domain: data.map(x),
        padding: 0.6,
      });
      const yScale = scaleLinear({
        rangeRound: [yMax, margin.top],
        domain: [0, Math.max(...data.map(y))],
      });

      // compose together the scale and accessor functions to get point functions
      const compose = (scale, accessor) => data => scale(accessor(data));
      const xPoint = compose(xScale, x);
      const yPoint = compose(yScale, y);
      return (
        <ChartContainer>
          <svg width={width} height={height}>
            {data.map((d, i) => {
              const barHeight = yMax - yPoint(d);
              return (
                <Group key={`bar-${i}`}>
                  <Bar
                    x={xPoint(d)}
                    y={yMax - barHeight}
                    rx={5}
                    ry={5}
                    height={barHeight}
                    width={xScale.bandwidth()}
                    fill={colors[d.name]}
                    innerRef={(node) => {
                      this.barElement = node;
                    }}
                  />
                  {/* data name label */}
                  <Text
                    x={this.state.barHeight ? xPoint(d) + this.state.barHeight / 2 : xPoint(d)}
                    y={yMax + 50}
                    verticalAnchor="middle"
                    angle={270}
                  >
                    {d.name}
                  </Text>
                  {/* data value label */}
                  <Text
                    x={this.state.barHeight ? xPoint(d) + this.state.barHeight / 2 : xPoint(d)}
                    y={yPoint(d) - 3}
                    verticalAnchor="middle"
                    angle={270}
                  >
                    {d.value}
                  </Text>
                </Group>
              );
            })}
          </svg>
        </ChartContainer>
      );
    }
    return null;
  }
}

export default StationChart;
