import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Box, Link as ChakraLink, Flex, Text, useTheme, Button, Icon } from '@chakra-ui/core';

const PoweredByCoindropLink = (props) => {
    const { accentColor } = props;
    const { colors } = useTheme();
    return (
        <Box
            textAlign="center"
            my={6}
        >
            <NextLink href="/" passHref>
                <ChakraLink style={{textDecoration: "none"}}>
                    <Button variant="outline">
                        <Flex align="center">
                            <Icon mr={1} name="github" />
                            <Text
                                textAlign="center"
                                fontFamily="Changa"
                                fontWeight="300"
                            >
                                Powered by
                                <span
                                    style={{
                                        color: colors[accentColor]['500'], // TODO: Use user accent color if exists
                                    }}
                                >
                                    {' Coindrop'}
                                </span>
                            </Text>
                        </Flex>
                    </Button>
                </ChakraLink>
            </NextLink>
        </Box>
    );
};

PoweredByCoindropLink.propTypes = {
    accentColor: PropTypes.string,
};

PoweredByCoindropLink.defaultProps = {
    accentColor: "orange",
};

export default PoweredByCoindropLink;
