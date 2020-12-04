import {
    ChakraProvider,
    cookieStorageManager,
    localStorageManager,
  } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { FunctionComponent } from "react";
import theme from './theme';

type Props = {
    cookies: Record<string, unknown> | string
}

export const Chakra: FunctionComponent<Props> = ({ cookies, children }) => {
  const colorModeManager = typeof cookies === "string" ? cookieStorageManager(cookies) : localStorageManager;
  return (
      <ChakraProvider
        colorModeManager={colorModeManager}
        theme={theme}
      >
        {children}
      </ChakraProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => ({
  props: {
    cookies: req.headers.cookie ?? "",
  },
});
