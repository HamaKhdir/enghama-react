import { createGlobalStyle } from 'styled-components';
import { device } from './breakpoints';

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* --- چارەسەری کۆتایی لێرەدایە --- */
  html, body, #root {
    height: 100%; /* گرنگترین دێڕ */
  }
  /* ---------------------------------- */

  html {
    font-size: 16px;
    @media ${device.tablet} { font-size: 15px; }
    @media ${device.mobile} { font-size: 14px; }
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-color: ${props => props.theme.background_color || '#f9f9f9'};
    color: ${props => props.theme.text_color || '#333'};
    line-height: 1.6;
  }
`;

export default GlobalStyles;