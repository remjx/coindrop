/* eslint-disable arrow-body-style */
import { FunctionComponent } from 'react';
import { useColorModeValue, Flex, Box, Text } from '@chakra-ui/react';
import {
    githubTermsOfServiceUrl,
} from '../../src/settings';
import { ExternalLink } from './ExternalLink';
import { InternalLink } from './InternalLink';
import { SocialLinks } from './SocialLinks';

const Footer: FunctionComponent = () => {
    // const backgroundColor = useColorModeValue("gray.200", "gray.600");
    return (
        <Box mt={4}>
            <hr />
            <Box
                // bg={backgroundColor}
                py={2}
            >
                <Flex justify="space-between" wrap="wrap">
                    <Flex align="center" wrap="wrap">
                        <InternalLink
                            href="/blog/page/1"
                            text="Blog"
                        />
                        <ExternalLink
                            href={githubTermsOfServiceUrl}
                            text="Terms"
                        />
                    </Flex>
                    <SocialLinks />
                </Flex>
            </Box>
        </Box>
    );
};

export default Footer;
