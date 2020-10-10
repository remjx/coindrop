import React from 'react';
import PropTypes from 'prop-types';
import { useTheme, Flex, Text, Box, Link, Icon } from '@chakra-ui/core';
import { 
    githubOpenSourceLicenseUrl,
    githubPrivacyPolicyUrl,
    githubTermsOfServiceUrl
} from '../../src/settings';

const fontSize = "0.84rem";

const IconLinkText = ({ iconName, text, href }) => (
    <Link href={href} target="_blank" rel="noreferrer">
        <Flex align="center" py={1}>
            <Icon name={iconName} mr={1} />
            <Text fontSize={fontSize}>
                {text}
            </Text>
        </Flex>
    </Link>
);
IconLinkText.propTypes = {
    iconName: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
};

const Footer = () => {
    const { colors: { gray } } = useTheme();
    return (
        <Box
            bg={gray['100']}
            py={1}
        >
            <Flex justify="space-around" wrap="wrap">
                <IconLinkText
                    iconName="github"
                    text="Open Source License"
                    href={githubOpenSourceLicenseUrl}
                />
                <IconLinkText
                    iconName="lock"
                    text="Privacy Policy"
                    href={githubPrivacyPolicyUrl}
                />
                <IconLinkText
                    iconName="info"
                    text="Terms of Service"
                    href={githubTermsOfServiceUrl}
                />
            </Flex>
        </Box>
    );
};

export default Footer;
