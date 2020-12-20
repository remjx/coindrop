/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import {
  FunctionComponent,
  // useEffect
} from 'react';
// import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import theme from '../components/theme';
import SEO from '../src/next-seo.config';

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  // const router = useRouter();

  /* This may not be needed, it looks like Google Analytics is double-counting when this is enabled */
  // useEffect(() => {
  //   const handleRouteChange = (url: URL) => {
  //     gtag('event', 'page_view', {
  //       page_path: url,
  //     });
  //   };
  //   router.events.on("routeChangeComplete", handleRouteChange);
  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [router.events]);
  return (
    <ChakraProvider theme={theme}>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
