/* eslint-disable arrow-body-style */
import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { SWRConfig } from "swr";
import theme from '../../components/theme';

function AllTheProviders({ children }) {
  return (
    // <SWRConfig value={{ dedupingInterval: 0 }}>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    // </SWRConfig>
  );
}

const customRender = (ui, options?) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
