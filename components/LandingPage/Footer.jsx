import PropTypes from 'prop-types';
import { useTheme, Flex, Text, Box, Link } from '@chakra-ui/react';
import { LockIcon, InfoIcon } from "@chakra-ui/icons";
import {
    githubOpenSourceLicenseUrl,
    githubPrivacyPolicyUrl,
    githubTermsOfServiceUrl,
} from '../../src/settings';
import { GithubIcon } from "../Icons/CustomIcons";

const fontSize = "0.84rem";

const IconLinkText = ({ icon, text, href }) => (
    <Link href={href} target="_blank" rel="noreferrer">
        <Flex align="center" py={1}>
            {icon}
            <Text ml={1} fontSize={fontSize}>
                {text}
            </Text>
        </Flex>
    </Link>
);
IconLinkText.propTypes = {
    icon: PropTypes.object.isRequired,
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
                    icon={<GithubIcon />}
                    text="Open Source License"
                    href={githubOpenSourceLicenseUrl}
                />
                <IconLinkText
                    icon={<LockIcon />}
                    text="Privacy Policy"
                    href={githubPrivacyPolicyUrl}
                />
                <IconLinkText
                    icon={<InfoIcon />}
                    text="Terms of Service"
                    href={githubTermsOfServiceUrl}
                />
            </Flex>
        </Box>
    );
};

export default Footer;
