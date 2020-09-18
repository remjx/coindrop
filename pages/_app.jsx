/* eslint-disable react/jsx-props-no-spreading */
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import PropTypes from 'prop-types';
import theme from '../components/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
    </ThemeProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.any.isRequired,
};

export default MyApp;
