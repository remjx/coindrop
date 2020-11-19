// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import {
    useTheme,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Text,
    Link,
} from "@chakra-ui/react";
import { githubUrl, markJacksonUrl, twitterUrl } from '../../src/settings';

const accordionText = [
    [
        "No fees? How?",
        <Box>
            <Text mb="1rem">
                Coindrop does not process any payments. Transactions are either sent peer-to-peer (e.g. Bitcoin) or directly through the payment provider of choice (e.g. CashApp).
            </Text>
            <Text mb="1rem">
                To cover costs and fund development of this site, we may display relevant, unobtrusive advertisements and offers.
            </Text>
            <Text>
                If we change this policy and you don&apos;t agree with it, there is an easy escape hatch. All the code to this website is open-source so you could remove the fees and run a free version of it yourself!
            </Text>
        </Box>,
    ],
    [
        "One of my preferred payment methods is not listed?",
        <Text>
            {"As long as it's safe and not against the law, we will add any payment method you wish. Submit a request "}
            <Link
                href="https://github.com/markjackson02/coindrop/issues/new?assignees=markjackson02&labels=enhancement&template=new_payment_method.md&title="
                target="_blank"
                rel="noreferrer"
            >
                <u>here</u>
            </Link>
            .
        </Text>,
    ],
    [
        "Who created this?",
        <Box>
            <Text>
                {"Hi! I'm "}
                <Link
                    href={markJacksonUrl}
                    rel="noreferrer"
                    target="_blank"
                >
                    <u>Mark Jackson</u>
                </Link>
                , an industrial engineer turned software developer currently living in Atlanta, GA, USA. I love hearing from users so please feel free to reach out for any reason!
            </Text>
        </Box>,
    ],
    [
        "How can I contribute?",
        <Text>
            {'We encourage users to add feature requests, report bugs, and contribute code on our public '}
            <Link href={githubUrl} target="_blank" rel="noreferrer">
                <u>Github</u>
            </Link>
            {' page.'}
        </Text>,
    ],
    [
        "How can I donate?",
        <Text>
            {"Visit Coindrop's Coindrop at "}
            <NextLink href="/coindrop" passHref>
                <Link>
                    <u>coindrop.to/coindrop</u>
                </Link>
            </NextLink>
        </Text>,
    ],
    [
        "I have a question that's not answered here?",
        <Text>
            {'Send us a DM on Twitter '}
            <Link href={twitterUrl} target="_blank" rel="noreferrer">
                @coindrop_to
            </Link>
            .
        </Text>,
    ],
];

const FAQ = () => {
    const { colors } = useTheme();
    return (
        <Accordion defaultIndex={-1} allowToggle>
            {accordionText.map(([title, body]) => (
                <AccordionItem key={title}>
                    <AccordionButton>
                    <Box flex="1" textAlign="left">
                        {title}
                    </Box>
                    <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                        <Box p={4} bg={colors.gray['50']}>
                            {body}
                        </Box>
                    </AccordionPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

FAQ.propTypes = {

};

FAQ.defaultProps = {

};

export default FAQ;
