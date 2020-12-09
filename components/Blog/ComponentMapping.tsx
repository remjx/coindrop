import Image from 'next/image';
import { Center, Heading, Text, Button, Link, UnorderedList, ListItem, OrderedList } from '@chakra-ui/react';

export const components = {
    h2: ({ children }) => <Heading as="h2" my="1.5rem" size="xl">{children}</Heading>,
    h3: ({ children }) => <Heading as="h3" my="1.5rem" size="lg">{children}</Heading>,
    h4: ({ children }) => <Heading as="h4">{children}</Heading>,
    button: Button,
    p: ({ children }) => <Text mb="1.5rem" fontSize="lg">{children}</Text>,
    Center,
    a: Link,
    ul: ({ children }) => <UnorderedList mb="1.5rem">{children}</UnorderedList>,
    ol: ({ children }) => <OrderedList mb="1.5rem">{children}</OrderedList>,
    li: ({ children }) => <ListItem fontSize="lg">{children}</ListItem>,
    Image,
};
