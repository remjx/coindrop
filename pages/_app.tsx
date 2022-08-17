/* eslint-disable react/jsx-props-no-spreading */
import { DefaultSeo } from 'next-seo';
import { FunctionComponent } from 'react';
import { AppProps } from 'next/app';
import { Chakra } from '../components/Chakra';
import SEO from '../src/next-seo.config';

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <Chakra cookies={pageProps.cookies}>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
  </Chakra>
);

export default MyApp;
