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
        "No fees... really?",
        <Box>
            <Text mb="1rem">
                Payments are peer-to-peer, so Coindrop takes
                {' no fee from receivers or senders, ever.'}
            </Text>
            <Text mb="1rem">
                If we hypothetically broke our promise and started charging fees to use this service, there is an easy escape hatch. All the code to this website is open-source so anyone could remove the fees and run a free version of it themselves!
            </Text>
            <Text>
                To cover server costs, we may display relevant, unobtrusive advertisements and offers on this site.
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
