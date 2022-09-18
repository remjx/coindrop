import {
    ChakraProvider,
    cookieStorageManagerSSR,
    localStorageManager,
  } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { FC } from "react";
import theme from './theme';

type Props = {
    cookies: Record<string, unknown> | string
    children: React.ReactNode
}

export const Chakra: FC<Props> = ({ cookies, children }) => {
  const colorModeManager = typeof cookies === "string" ? cookieStorageManagerSSR(cookies) : localStorageManager;
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
