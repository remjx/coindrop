import PropTypes from 'prop-types';
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
import { githubUrl, markJacksonUrl } from '../../src/settings';

const accordionText = [
    [
        "If it's free, what's the catch?",
        <Box>
        <Text>
            <b>Users pay you directly </b>
            {' so there is no platform fee.'}
            .
            <b>{' All features will always be free '}</b>
            {'for both senders and receivers as they are developed by the '}
            <Link href={githubUrl} target="_blank">
                open-source community
            </Link>
            {'. '}
            <b>We are able to host this site for free</b>
            {' under certain usage limits thanks to '}
            <Link href="http://vercel.com" target="_blank">
                Vercel
            </Link>
            {' and '}
            <Link href="http://firebase.google.com" target="_blank">
                Firebase
            </Link>
            . We may add relevant, unobtrusive advertisements in order to offset costs and support the site. You'll be able to monetize 
        </Text>
        </Box>,
    ],
    [
        "If it's free, who pays for keeping the service online?",
        <Box>
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

const FAQ = () => {
    const { colors } = useTheme();
    return (
        <Accordion defaultIndex={-1}>
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
