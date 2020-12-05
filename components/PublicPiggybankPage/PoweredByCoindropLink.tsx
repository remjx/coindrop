import { FunctionComponent } from 'react';
import NextLink from 'next/link';
import { Box, Link as ChakraLink, Flex, Text, useTheme, Button } from '@chakra-ui/react';
import { GithubIcon } from '../Icons/CustomIcons';

type Props = {
    accentColor: string
}

const PoweredByCoindropLink: FunctionComponent<Props> = ({ accentColor = 'orange' }) => {
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
                            <GithubIcon mr={1} />
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

export default PoweredByCoindropLink;
