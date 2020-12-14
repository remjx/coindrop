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
        overflow="scroll"
    >
        {children}
    </Code>
);

export const components = {
    h2: ({ children }) => <Heading as="h2" my="1.5rem" size="xl">{children}</Heading>,
    h3: ({ children }) => <Heading as="h3" my="1.5rem" size="lg">{children}</Heading>,
    h4: ({ children }) => <Heading as="h4" my="1.5rem" size="md">{children}</Heading>,
    p: ({ children }) => <Text mb="1.5rem" fontSize="lg">{children}</Text>,
    Center,
    a: Link,
    ul: ({ children }) => <UnorderedList mb="1.5rem">{children}</UnorderedList>,
    ol: ({ children }) => <OrderedList mb="1.5rem">{children}</OrderedList>,
    li: ({ children }) => <ListItem fontSize="lg">{children}</ListItem>,
    Image,
    ImageBorder,
    code: CodeBlock,
};
