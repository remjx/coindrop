import React from 'react';
import { Flex, Image, Text, useTheme } from '@chakra-ui/core';

const Logo = () => {
    const theme = useTheme();
    return (
        <Flex ml={2} align="center">
            <Image src="/piggy-question-256.png" width="64px" height="64px" />
            <Text
                fontSize="5xl"
                fontFamily="Changa"
                fontWeight={500}
                color={theme.colors.gray['500']}
                ml={2}
            >
                coindrop
            </Text>
        </Flex>
    );
}

export default Logo;
