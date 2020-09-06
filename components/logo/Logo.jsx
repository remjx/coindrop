import React from 'react';
import { Flex, Image, Text } from '@chakra-ui/core';

const Logo = () => (
    <Flex ml={2} align="center">
        <Image src="/piggy-question-256.png" width="64px" height="64px" />
        <Text
            fontSize="5xl"
            fontFamily="Changa"
            fontWeight={500}
            color="#6C6B6F"
            ml={2}
        >
            coindrop
        </Text>
    </Flex>
)

export default Logo;
