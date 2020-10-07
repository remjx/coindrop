import PropTypes from 'prop-types';
import NextLink from 'next/link';
import {
    useTheme,
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon,
    Box,
    Text,
    Link,
} from "@chakra-ui/core";
import { githubUrl, markJacksonUrl, twitterUrl } from '../../src/settings';

const accordionText = [
    [
        "No fees... really?",
        <Box>
            <Text mb="1rem">
                Payments are peer-to-peer, so Coindrop takes
                {' no middleman fee from receivers or senders, ever.'}
            </Text>
            <Text mb="1rem">
                If we hypothetically broke our promise and started charging fees to use this service, there is an easy escape hatch. All the code to this website is open-source so anyone could remove the fees and run a free version of it themselves!
            </Text>
            <Text>
                To cover server costs and help fund development, we may display relevant, unobtrusive advertisements and offers on this site.
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
            >
                <u>here</u>
            </Link>
            .
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
        "How can I contribute?",
        <Text>
            {'We encourage users to add feature requests, report bugs, and contribute code on our public '}
            <Link href={githubUrl} target="_blank">
                <u>Github</u>
            </Link>
            {' page.'}
        </Text>,
    ],
    [
        "Who created this?",
        <Box>
            <Text>
                {"Hi! I'm "}
                <Link
                    href={markJacksonUrl}
                >
                    <u>Mark Jackson</u>
                </Link>
                , an industrial engineer turned software developer currently living in Atlanta, GA, USA. I love hearing from users so please feel free to reach out for any reason!
            </Text>
        </Box>,
    ],
    [
        "I have a question that's not answered here?",
        <Text>
            {'Send us a DM on Twitter '}
            <Link href={twitterUrl} target="_blank">
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
                    <AccordionHeader>
                    <Box flex="1" textAlign="left">
                        {title}
                    </Box>
                    <AccordionIcon />
                    </AccordionHeader>
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
