import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Flex, Text, useTheme, Button } from '@chakra-ui/core';
import Logo from '../Logo/Logo';

const PoweredByCoindropLink = () => {
    const { colors: { logoPrimary }} = useTheme();
    return (
        <Link href="/">
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
        </Link>
    );
};

PoweredByCoindropLink.propTypes = {

};

PoweredByCoindropLink.defaultProps = {

};

export default PoweredByCoindropLink;
