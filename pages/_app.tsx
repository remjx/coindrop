/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import { FunctionComponent } from 'react';
import { AppProps } from 'next/app';
import theme from '../components/theme';
import SEO from '../src/next-seo.config';

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
  </ChakraProvider>
);

export default MyApp;
