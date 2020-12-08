import { MDXProvider } from '@mdx-js/react';
import { Heading, Text } from '@chakra-ui/react';

const components = {
  h2: ({ children }) => <Heading as="h2">{children}</Heading>,
  p: Text,
};

export default props => (
  <MDXProvider components={components}>
    <main {...props} />
  </MDXProvider>
);
