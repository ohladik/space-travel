import React from 'react';
import styled from 'styled-components';
import surfaceTexture from './surface.png';

const colors = {
  mercury: ['#DBD2B7', '#92C3D3'],
  venus: ['#D34550', '#9F5FB6'],
  mars: ['#FF826D', '#E9326D'],
  jupiter: ['#DB988B', '#D9B383'],
  saturn: ['#55F9BC', '#3499AD'],
  uranus: ['#71B1C8', '#9CBDC5'],
  neptune: ['#51ABF0', '#4EBEF6'],
  pluto: ['#FAC9E8', '#BDEAFE'],
};

const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

// Surface texture on the planet rotates.
// The gradient background stays still.
const Planet = styled.div`
  background: linear-gradient(
    ${props => colors[props.name][0]},
    ${props => colors[props.name][1]} 60%
  );
  height: ${props => (props.size ? `${props.size}px` : '400px')};
  width: ${props => (props.size ? `${props.size}px` : '400px')};
  border-radius: ${props => (props.size ? `${props.size}px` : '400px')};
  z-index: 1;
  /* box-shadow: 0px 0px 50px 1px rgba(255, 255, 255, 0.2); */
  box-shadow: ${props => `0px 0px 50px 1px ${hex2rgba(colors[props.name][0], 0.5)}`};
  &::after {
    content: ' ';
    z-index: 999;
    display: block;
    position: relative;
    left: 0;
    top: 0;
    height: ${props => (props.size ? `${props.size}px` : '400px')};
    width: ${props => (props.size ? `${props.size}px` : '400px')};
    border-radius: ${props => (props.size ? `${props.size}px` : '400px')};
    opacity: 0.3;
    /* surface texture and its animation is disabled */
    /* background-image: url(${surfaceTexture}); */
    /* animation: spin 600s linear infinite; */
    @keyframes spin {
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
  }
`;

const PlanetWrapper = ({ name, size }) => <Planet name={name} size={size} />;

export default PlanetWrapper;
