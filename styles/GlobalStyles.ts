import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *{
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    font-weight: 500;
  }
  body {
    background: ${({ theme }) => theme.colors.base};
    color: black;
    font-family: 'Poppins', sans-serif;
    margin: 0;
    width: 90vw;
    height: 100vh;
    margin: auto;
  }
  h1 {
    font-size: 36px;
    font-weight: 600;
  }
  h2 {
    font-size: 24px;
    font-weight: 500;
  }
  h3 {
    font-size: 18px;
    font-weight: 500;
  }
  h4 {
    font-size: 12px;
    font-weight: 500;
    text-decoration: underline;
  }
`;

export default GlobalStyles;
