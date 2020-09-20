import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Link as ChakraLink, Flex, Text, useTheme, Button } from '@chakra-ui/core';
import Logo from '../Logo/Logo';

const PoweredByCoindropLink = () => {
    const { colors: { logoPrimary }} = useTheme();
    return (
        <NextLink href="/" passHref>
            <ChakraLink style={{textDecoration: "none"}}>
                <Button variant="outline">
                    <Flex align="center">
                        <Text
                            textAlign="center"
                            fontFamily="Changa"
                        >
                            Powered by
                            <span
                                style={{
                                    color: logoPrimary,
                                    fontWeight: "500",
                                }}
                            >
                                {' Coindrop'}
                            </span>
                        </Text>
                    </Flex>
                </Button>
            </ChakraLink>
        </NextLink>
    );
};

PoweredByCoindropLink.propTypes = {

};

PoweredByCoindropLink.defaultProps = {

};

export default PoweredByCoindropLink;
