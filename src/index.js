import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import App from './App';
import backgroundTexture from './stars.png';
import registerServiceWorker from './registerServiceWorker';

// TODO: compress background texture

// global styles
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');

  html {
    font-family: 'Open Sans', sans-serif;
    min-height: 100%;
    background: linear-gradient(#36143E, #1C1439);
    &::before {
      content: ' ';
      z-index: -1;
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-image: url(${backgroundTexture});
      animation: pulse 8s linear infinite;
      /* too GPU demanding */
      /* animation: scroll 700s linear infinite; */
      @keyframes pulse {
        0% {
          opacity: 0.8;
        }
        10% {
          opacity: 0.5;
        }
        20% {
          opacity: 0.8;
        }
        100% {
          opacity: 0.8;
        }
      }
      @keyframes scroll {
        from {
          transform: translateX(0%);
        }
        to {
          transform: translateX(-100%);
        }
      }
    }
  }

  body {
    margin: 0;
  }

  a {
    text-decoration: none;
  }

  .animated-page-wrapper {
    min-height: 100vh;
  }
`;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
