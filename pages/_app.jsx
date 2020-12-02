/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import PropTypes from 'prop-types';
import theme from '../components/theme';
import SEO from '../src/next-seo.config';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
    </ChakraProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.any.isRequired,
};

export default MyApp;
