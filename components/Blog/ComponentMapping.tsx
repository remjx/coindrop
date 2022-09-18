import Image from 'next/image';
import { Code, Center, Heading, Text, Link, UnorderedList, ListItem, OrderedList } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FC } from 'react';

const ImageBorder: FC<{ children: React.ReactNode }> = ({ children }) => (
    <div style={{border: "1px solid #656468"}}>
        {children}
    </div>
);

const CodeBlock: FC<{ children: React.ReactNode }> = ({ children }) => (
    <Code
        display="block"
        overflowX="scroll"
    >
        {children}
    </Code>
);

export const components = {
    h1: ({ children }): React.ReactNode => <Heading as="h1" my="1.5rem" size="2xl">{children}</Heading>,
    h2: ({ children }): React.ReactNode => <Heading as="h2" my="1.5rem" size="xl">{children}</Heading>,
    h3: ({ children }): React.ReactNode => <Heading as="h3" my="1.5rem" size="lg">{children}</Heading>,
    h4: ({ children }): React.ReactNode => <Heading as="h4" my="1.5rem" size="md">{children}</Heading>,
    p: ({ children }): React.ReactNode => <Text mb="1.5rem" fontSize="lg">{children}</Text>,
    Center,
    ul: ({ children }): React.ReactNode => <UnorderedList mb="1.5rem">{children}</UnorderedList>,
    ol: ({ children }): React.ReactNode => <OrderedList mb="1.5rem">{children}</OrderedList>,
    li: ({ children }): React.ReactNode => <ListItem fontSize="lg">{children}</ListItem>,
    Image,
    ImageBorder,
    code: Code,
    CodeBlock,
    a: ({ children, href }): React.ReactNode => <u><Link href={href} isExternal>{children}</Link></u>,
    NextLink: ({ children, href }): React.ReactNode => <u><NextLink href={href}>{children}</NextLink></u>,
};
