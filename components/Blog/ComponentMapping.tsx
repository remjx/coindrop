import Image from 'next/image';
import { Center, Heading, Text, Button } from '@chakra-ui/react';

export const components = {
    h2: ({ children }) => <Heading as="h2" mb="1.5rem">{children}</Heading>,
    h3: ({ children }) => <Heading as="h3">{children}</Heading>,
    h4: ({ children }) => <Heading as="h4">{children}</Heading>,
    button: Button,
    p: ({ children }) => <Text mb="1.5rem">{children}</Text>,
    Center,
};
