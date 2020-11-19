/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import PropTypes from 'prop-types';
import theme from '../components/theme';
import AppContext from '../components/AppContext/AppContext';
import SEO from '../src/next-seo.config';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AppContext>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </AppContext>
    </ChakraProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.any.isRequired,
};

export default MyApp;
