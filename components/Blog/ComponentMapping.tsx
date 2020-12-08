import { Heading, Text, Button } from '@chakra-ui/react';

export const components = {
    h2: ({ children }) => <Heading as="h2">{children}</Heading>,
    h3: ({ children }) => <Heading as="h3">{children}</Heading>,
    h4: ({ children }) => <Heading as="h4">{children}</Heading>,
    button: Button,
    p: Text,
};
