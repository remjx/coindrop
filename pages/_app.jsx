/* eslint-disable react/jsx-props-no-spreading */
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import PropTypes from 'prop-types';
import theme from '../components/theme';
import AppContext from '../components/AppContext/AppContext';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <AppContext>
        <CSSReset />
        <Component {...pageProps} />
      </AppContext>
    </ThemeProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.any.isRequired,
};

export default MyApp;
