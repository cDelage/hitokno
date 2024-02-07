import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root{

  //Color palette

  --color-primary-50: #F0F9FF;
  --color-primary-100: #E0F2FE;
  --color-primary-200: #BAE6FD;
  --color-primary-300: #7DD3FC;
  --color-primary-400: #38BDF8;
  --color-primary-500: #0EA5E9;
  --color-primary-600: #0284C7;
  --color-primary-700: #0369A1;
  --color-primary-800: #075985;
  --color-primary-900: #0C4A6E;
  --color-primary-950: #082F49;

  --color-secondary-50: #FEFCE8;
  --color-secondary-100: #FEF9C3;
  --color-secondary-200: #FEF08A;
  --color-secondary-300: #FDE047;
  --color-secondary-400: #FACC15;
  --color-secondary-500: #EAB308;
  --color-secondary-600: #CA8A04;
  --color-secondary-700: #A16207;
  --color-secondary-800: #854D0E;
  --color-secondary-900: #713F12;
  --color-secondary-950: #422006;

  --color-positive-50: #F0FDF4;
  --color-positive-100: #DCFCE7;
  --color-positive-200: #BBF7D0;
  --color-positive-300: #86EFAC;
  --color-positive-400: #4ADE80;
  --color-positive-500: #22C55E;
  --color-positive-600: #16A34A;
  --color-positive-700: #15803D;
  --color-positive-800: #166534;
  --color-positive-900: #14532D;
  --color-positive-950: #052E16;

  --color-warning-50: #FFF7ED;
  --color-warning-100: #FFEDD5;
  --color-warning-200: #FED7AA;
  --color-warning-300: #FDBA74;
  --color-warning-400: #FB923C;
  --color-warning-500: #F97316;
  --color-warning-600: #EA580C;
  --color-warning-700: #C2410C;
  --color-warning-800: #9A3412;
  --color-warning-900: #7C2D12;
  --color-warning-950: #431407;
  
  --color-negative-50: #FFF1F2;
  --color-negative-100: #FFE4E6;
  --color-negative-200: #FECDD3;
  --color-negative-300: #FDA4AF;
  --color-negative-400: #FB7185;
  --color-negative-500: #F43F5E;
  --color-negative-600: #E11D48;
  --color-negative-700: #BE123C;
  --color-negative-800: #9F1239;
  --color-negative-900: #881337;
  --color-negative-950: #4C0519;

  --color-gray-50: #FAFAF9;
  --color-gray-100: #F5F5F4;
  --color-gray-200: #E7E5E4;
  --color-gray-300: #D6D3D1;
  --color-gray-400: #A8A29E;
  --color-gray-500: #78716C;
  --color-gray-600: #57534E;
  --color-gray-700: #44403C;
  --color-gray-800: #292524;
  --color-gray-900: #1C1917;
  --color-gray-950: #0C0A09;
  --color-white: #ffffff;

  --bg-main: var(--color-primary-50);
  --bg-layout: var(--color-primary-100);
  --bg-close : var(--color-negative-600);
  --bg-white: var(--color-white);
  --bg-element: var(--color-white);
  --bg-element-hover: var(--color-gray-100);
  --bg-button-secondary-hover: var(--color-white);

  --text-layout : var(--color-primary-600);
  --text-close: var(--color-white);
  --text-main-blue: var(--color-primary-600);
  --text-main-medium: var(--color-gray-600);
  --text-main-dark: var(--color-gray-800);

  --shadow-md : 0 1px 1px 0 rgba(0, 0, 0, 0.25);

  
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 20px;
  font-size: 16px;
  font-weight: 400;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;

  background-color: var(--bg-main);
  color: var(--text-main-medium);

 }

 html, body, #root {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    border: 0;
}

h1 {
  font-size: 24px;
  line-height  : 28px;
  font-weight: 500;
  margin: 0px;
}
`;

export default GlobalStyle;
