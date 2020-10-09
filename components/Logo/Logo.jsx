import PropTypes from 'prop-types';
import { Flex, Text as ChakraText, useTheme, Icon } from '@chakra-ui/core';

const Logo = ({ text, logoSize, fontSize, reverse }) => {
    const theme = useTheme();
    const Image = () => (
        <Icon name="piggyLogo" size={logoSize} />
    );
    const Text = () => (
        <ChakraText
            fontSize={fontSize}
            fontFamily="Changa"
            fontWeight={500}
            color={theme.colors.gray['500']}
            ml={reverse ? 0 : 2}
            mr={reverse ? 2 : 0}
        >
            {text}
        </ChakraText>
    );
    return (
        <Flex
            ml={2}
            align="center"
        >
            {!reverse ? (
                <>
                <Image />
                <Text />
                </>
            ) : (
                <>
                <Text />
                <Image />
                </>
            )}
        </Flex>
    );
};

Logo.propTypes = {
    text: PropTypes.string,
    logoSize: PropTypes.arrayOf(PropTypes.string),
    fontSize: PropTypes.arrayOf(PropTypes.string),
    reverse: PropTypes.bool,
};

Logo.defaultProps = {
    text: 'coindrop',
    logoSize: ["48px", "64px"],
    fontSize: ["4xl", "5xl"],
    reverse: false,
};

export default Logo;
