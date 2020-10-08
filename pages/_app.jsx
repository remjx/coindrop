/* eslint-disable react/jsx-props-no-spreading */
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { DefaultSeo } from 'next-seo';
import PropTypes from 'prop-types';
import theme from '../components/theme';
import AppContext from '../components/AppContext/AppContext';
import SEO from '../src/next-seo.config';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <AppContext>
        <CSSReset />
        <DefaultSeo {...SEO} />
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
