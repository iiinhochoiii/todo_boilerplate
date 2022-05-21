import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages';

import { GlobalStyle } from 'styles/global-styles';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import PostStore from 'contexts/posts';

function App() {
  return (
    <PostStore>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </PostStore>
  );
}

export default App;
