import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Image, Text } from '@chakra-ui/core';

const Logo = () => (
    <Flex ml={2} align="center">
        <Image src="/001-piggy-bank-128px-questionmark.png" width="64px" height="64px" />
        <Text
            fontSize="5xl"
            fontFamily="Changa"
            fontWeight={500}
            ml={2}
        >
            <Text as="span"
                color="#FFDE55"
            >
                coin
            </Text>
            <Text as="span"
                color="#FFB655"
            >
                drop
            </Text>
        </Text>
    </Flex>
)

Logo.propTypes = {

};

Logo.defaultProps = {

};

export default Logo;
