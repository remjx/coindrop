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
    Link,
    useColorModeValue,
    UnorderedList,
    ListItem,
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
                    <ListItem>Through the payment provider of choice (e.g. PayPal)</ListItem>
                </UnorderedList>
                <Text mb="1rem">
                    {'Depending on the payment method senders choose, there may be a small transaction fee for them. '}
                    <b>That&apos;s the beauty of Coindrop - senders can choose the payment method with the lowest transaction fee.</b>
                </Text>
                <Text mb="1rem">
                    To cover costs and fund development of this site, we may display relevant, unobtrusive advertisements and offers. Keep in mind all the code to this website is open-source so if we implement something you don&apos;t like, you can always fork the project on Github :)
                </Text>
            </Box>
        ),
    },
    {
        title: "What if one of my payment methods is not listed?",
        body: (
            <Text>
                {"We will add any payment method option as long as it's safe and not against the law. Submit a request "}
                <Link
                    href="https://github.com/markjackson02/coindrop/issues/new?assignees=markjackson02&labels=enhancement&template=new_payment_method.md&title="
                    isExternal
                >
                    <u>here</u>
                </Link>
                .
            </Text>
        ),
    },
    {
        title: "Who created this?",
        body: (
            <Box>
                <Text>
                    <Link
                        href={`${markJacksonWebsite}/about`}
                        isExternal
                    >
                        <u>Mark Jackson</u>
                    </Link>
                </Text>
            </Box>
        ),
    },
    {
        title: "How can I contribute?",
        body: (
            <Text>
                {'Submit feature requests, report bugs, and contribute code on our public '}
                <Link href={githubUrl} isExternal>
                    <u>Github</u>
                </Link>
                {' page.'}
            </Text>
        ),
    },
    {
        title: "How can I donate?",
        body: (
            <Text>
                <NextLink href="/coindrop" passHref>
                    <Link>
                        <u>coindrop.to/coindrop</u>
                    </Link>
                </NextLink>
            </Text>
        ),
    },
];

const FAQ: FunctionComponent = () => {
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
            <Container maxW="lg">
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
                <Link href={`mailto:${coindropEmail}`} isExternal>
                    coindrop.to@gmail.com
                </Link>
            </Text>
        </Box>
    );
};

export default withDefaultLayout(FAQ);
