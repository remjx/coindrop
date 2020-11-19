import PropTypes from 'prop-types';
import { Flex, Text, useTheme } from '@chakra-ui/react';
import { PiggyLogoIcon } from "../Icons/CustomIcons";

const Logo = ({ text }) => {
    const theme = useTheme();
    const Image = () => (
        <PiggyLogoIcon boxSize={["48px", "64px"]} />
    );
    const LogoText = () => (
        <Text
            fontSize={["4xl", "5xl"]}
            fontFamily="Changa"
            fontWeight={500}
            color={theme.colors.gray['500']}
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
