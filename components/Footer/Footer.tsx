/* eslint-disable arrow-body-style */
import { FunctionComponent } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import {
    githubTermsOfServiceUrl,
    coindropEmail,
} from '../../src/settings';
import { ExternalLink } from './ExternalLink';
import { InternalLink } from './InternalLink';
import { SocialLinks } from './SocialLinks';

const Divider: FunctionComponent = () => (
    <Text mx={3}>
        |
    </Text>
);

const Footer: FunctionComponent = () => {
    return (
        <Box mt={10}>
            <hr />
            <Box
                py={2}
            >
                <Flex justify="space-between" wrap="wrap">
                    <Flex
                        align="center"
                        wrap="wrap"
                    >
                        <InternalLink
                            href="/"
                            text="Home"
                        />
                        <Divider />
                        <InternalLink
                            href="/blog/page/1"
                            text="Blog"
                        />
                        <Divider />
                        <ExternalLink
                            href={githubTermsOfServiceUrl}
                            text="Terms"
                        />
                        <Divider />
                        <ExternalLink
                            href={`mailto:${coindropEmail}`}
                            text="Support"
                        />
                    </Flex>
                    <SocialLinks />
                </Flex>
            </Box>
        </Box>
    );
};

export default Footer;
