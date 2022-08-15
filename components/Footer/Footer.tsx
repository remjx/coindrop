/* eslint-disable arrow-body-style */
import { FunctionComponent } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import {
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
            <Flex justify="space-between" wrap="wrap">
                <Flex
                    align="center"
                    wrap="wrap"
                    justify="center"
                    mx={["auto", null, "initial"]}
                    p={2}
                >
                    <InternalLink
                        href="/"
                        text="Home"
                    />
                    <Divider />
                    <InternalLink
                        href="/faq"
                        text="FAQ"
                    />
                    <Divider />
                    {/* This is an external link as a hack to force Ecwid scripts to run on page changes */}
                    <ExternalLink
                        href="/shop"
                        text="Shop"
                        openInNewTab={false}
                    />
                    <Divider />
                    <InternalLink
                        href="/blog/page/1"
                        text="Blog"
                    />
                    <Divider />
                    <InternalLink
                        href="/blog/terms-of-service"
                        text="Terms"
                    />
                    <Divider />
                    <InternalLink
                        href="/blog/privacy-policy"
                        text="Privacy"
                    />
                    <Divider />
                    <ExternalLink
                        href={`mailto:${coindropEmail}`}
                        text="Help"
                    />
                </Flex>
                <SocialLinks />
            </Flex>
        </Box>
    );
};

export default Footer;
