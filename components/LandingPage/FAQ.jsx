import PropTypes from 'prop-types';
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon,
    Box,
    Text,
    Link,
} from "@chakra-ui/core";
import { githubUrl, markJacksonUrl } from '../../src/settings';

const accordionText = [
    [
        "No fees... how?",
        <Text>
            <b>Users pay you directly </b>
            {' so there is no platform fee.'}
            {' All features are developed by the '}
            <Link href={githubUrl} target="_blank">
                open-source community
            </Link>
            {' and will '}
            <b>{'always be free '}</b>
            for both senders and receivers.
        </Text>,
    ],
    [
        "If it's free, who pays for keeping the service online?",
        <Box>
            <Text>
                We are able to host this site for free under certain usage limits
                {' thanks to '}
                <Link href="http://vercel.com" target="_blank">
                    Vercel
                </Link>
                {' and '}
                <Link href="http://firebase.google.com" target="_blank">
                    Firebase
                </Link>
                .
            </Text>
            <br />
            <Text>
                As the site grows, we may add advertisements and referral links to some of the payment methods in order to generate revenue and support the site.
            </Text>
            <br />
            <Text>
                {'Coindrop.to is managed by '}
                <Link
                    href={markJacksonUrl}
                >
                    Mark Jackson
                </Link>
                {'. All code is sourced from '}
                <Link href={githubUrl} target="_blank">
                    Github
                </Link>
                .
            </Text>
        </Box>,
    ],
];

const FAQ = () => (
    <Accordion defaultIndex={-1}>
        {accordionText.map(([title, body]) => (
            <AccordionItem key={title}>
                <AccordionHeader>
                <Box flex="1" textAlign="left">
                    {title}
                </Box>
                <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                    {body}
                </AccordionPanel>
            </AccordionItem>
        ))}
    </Accordion>
);

FAQ.propTypes = {

};

FAQ.defaultProps = {

};

export default FAQ;
