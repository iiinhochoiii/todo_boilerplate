import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    height:100%;
    margin:0;
    padding:0;
    width:100%;
    background-color: #fff;
    color: #333333;
    font-family: 'Roboto', sans-serif;
  }
  a {
    color: #000;
    cursor: pointer;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    text-decoration: none;
    border: none;
  }
`;
