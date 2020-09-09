import React from 'react';
import { Flex, Image, Text, useTheme } from '@chakra-ui/core';

const Logo = () => {
    const theme = useTheme();
    const logoSize = ["48px", "64px"]
    return (
        <Flex ml={2} align="center">
            <Image src="/piggy-question-256.png" width={logoSize} height={logoSize} />
            <Text
                fontSize={["4xl", "5xl"]}
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
