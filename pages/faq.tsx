// eslint-disable-next-line no-unused-vars
import { FunctionComponent } from 'react';
import NextLink from 'next/link';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Container,
    Heading,
    Text,
    Link as ChakraLink,
    useColorModeValue,
    UnorderedList,
    ListItem,
    useTheme,
} from "@chakra-ui/react";
import { withDefaultLayout } from '../components/Layout/DefaultLayoutHOC';
import { coindropEmail, githubUrl, markJacksonWebsite } from '../src/settings';

type AccordionText = {
    title: string
    body: JSX.Element
}
const accordionText: AccordionText[] = [
    {
        title: "How are there no fees?",
        body: (
            <Box>
                <Text mb="1rem">
                    Coindrop does not process any payments.
                </Text>
                <Text mb="0.25rem">
                    Transactions are either sent:
                </Text>
                <UnorderedList mb="1rem">
                    <ListItem>Peer-to-peer (e.g. Bitcoin)</ListItem>
                    <ListItem>Through a payment provider of choice (e.g. PayPal)</ListItem>
                </UnorderedList>
                <Text mb="1rem">
                    {'Depending on the payment method senders choose, there may be a small transaction fee for them. '}
                    <b>That&apos;s the beauty of Coindrop - senders can choose the payment method with the lowest transaction fee.</b>
                </Text>
            </Box>
        ),
    },
    {
        title: "How does this site make money?",
        body: (
            <Box>
                <Text mb="1rem">
                    To cover costs and fund development of this site, we may display relevant advertisements, offers, and affiliate links.
                </Text>
            </Box>
        ),
    },
    {
        title: "What if one of my payment methods is not listed?",
        body: (
            <Text>
                {"We will add any payment method option as long as it's safe and not against the law. Submit a request "}
                <ChakraLink
                    href={`mailto:${coindropEmail}`}
                    isExternal
                >
                    <u>here</u>
                </ChakraLink>
                .
            </Text>
        ),
    },
    {
        title: "Who created this?",
        body: (
            <Box>
                <Text>
                    <ChakraLink
                        href={`${markJacksonWebsite}/about`}
                        isExternal
                    >
                        <u>Mark Jackson</u>
                    </ChakraLink>
                </Text>
            </Box>
        ),
    },
    {
        title: "How can I contribute?",
        body: (
            <Text>
                {'Submit feature requests, report bugs, and contribute code on our public '}
                <ChakraLink href={githubUrl} isExternal>
                    <u>Github</u>
                </ChakraLink>
                {' page.'}
            </Text>
        ),
    },
    {
        title: "How can I support?",
        body: (
            <>
            <Text>
                {'Donate at '}
                <NextLink href="/coindrop">
                    <ChakraLink as="span">
                        <u>coindrop.to/coindrop</u>
                    </ChakraLink>
                </NextLink>
            </Text>
            <Text>
                {'Give us a Like on '}
                <ChakraLink href="https://alternativeto.net/software/coindrop/" isExternal>
                    <u>AlternativeTo.net</u>
                </ChakraLink>
            </Text>
            <Text mt={2}>
                Thank you! 🙏
            </Text>
            </>
        ),
    },
];

const FAQ: FunctionComponent = () => {
    const theme = useTheme();
    const panelBgColor = useColorModeValue("gray.50", undefined);
    return (
        <Box>
            <Box my={6}>
                <Heading as="h1" textAlign="center">
                    FAQ
                </Heading>
                <Text textAlign="center">
                    Frequently Asked Questions
                </Text>
            </Box>
            <Container maxW={theme.breakpoints.lg}>
                <Accordion defaultIndex={-1} allowToggle>
                    {accordionText.map(({title, body}) => (
                        <AccordionItem key={title}>
                            <AccordionButton>
                            <Box flex="1" textAlign="left">
                                {title}
                            </Box>
                            <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel>
                                <Box
                                    p={4}
                                    bg={panelBgColor}
                                >
                                    {body}
                                </Box>
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Container>
            <Text textAlign="center" mt={4} fontSize="sm">
                {"Do you have a question that's not answered here? Send it to "}
                <ChakraLink href={`mailto:${coindropEmail}`} isExternal>
                    {coindropEmail}
                </ChakraLink>
            </Text>
        </Box>
    );
};

export default withDefaultLayout(FAQ);
