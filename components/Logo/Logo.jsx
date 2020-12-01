import PropTypes from 'prop-types';
import { Flex, Text, useTheme, useColorModeValue } from '@chakra-ui/react';
import { PiggyLogoIcon } from "../Icons/CustomIcons";

const Logo = ({ text }) => {
    const theme = useTheme();
    const fontColor = useColorModeValue(theme.colors.gray['600'], theme.colors.gray['50']);
    const logoOutlineColor = useColorModeValue(theme.colors.gray['800'], theme.colors.gray['900']);
    const Image = () => (
        <PiggyLogoIcon color={logoOutlineColor} boxSize={["48px", "64px"]} />
    );
    const LogoText = () => (
        <Text
            fontSize={["4xl", "5xl"]}
            fontFamily="Changa"
            fontWeight={500}
            color={fontColor}
            ml={2}
        >
            {text}
        </Text>
    );
    return (
        <Flex
            ml={1}
            mr={2}
            align="center"
        >
            <Image />
            <LogoText />
        </Flex>
    );
};

Logo.propTypes = {
    text: PropTypes.string,
};

Logo.defaultProps = {
    text: 'coindrop',
};

export default Logo;
