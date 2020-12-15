import Image from 'next/image';
import { Code, Center, Heading, Text, Link, UnorderedList, ListItem, OrderedList } from '@chakra-ui/react';
import { FC } from 'react';

const ImageBorder: FC = ({ children }) => (
    <div style={{border: "1px solid #656468"}}>
        {children}
    </div>
);

const CodeBlock: FC = ({ children }) => (
    <Code
        display="block"
        overflowX="scroll"
    >
        {children}
    </Code>
);

export const components = {
    h1: ({ children }) => <Heading as="h1" my="1.5rem" size="2xl">{children}</Heading>,
    h2: ({ children }) => <Heading as="h2" my="1.5rem" size="xl">{children}</Heading>,
    h3: ({ children }) => <Heading as="h3" my="1.5rem" size="lg">{children}</Heading>,
    h4: ({ children }) => <Heading as="h4" my="1.5rem" size="md">{children}</Heading>,
    p: ({ children }) => <Text mb="1.5rem" fontSize="lg">{children}</Text>,
    Center,
    ul: ({ children }) => <UnorderedList mb="1.5rem">{children}</UnorderedList>,
    ol: ({ children }) => <OrderedList mb="1.5rem">{children}</OrderedList>,
    li: ({ children }) => <ListItem fontSize="lg">{children}</ListItem>,
    Image,
    ImageBorder,
    code: Code,
    CodeBlock,
};
