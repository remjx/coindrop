import { FunctionComponent } from 'react';
import NextLink from 'next/link';
import { Box, Button, Link as ChakraLink, Flex, Text, useTheme, useColorModeValue, useColorMode } from '@chakra-ui/react';
import { GithubIcon } from '../Icons/CustomIcons';
import { getAccentColorLevelInitial } from './PublicPiggybankPage';

type Props = {
    accentColor: string
}

const PoweredByCoindropLink: FunctionComponent<Props> = ({ accentColor = 'orange' }) => {
    const { colors } = useTheme();
    const { colorMode } = useColorMode();
    const accentColorLevel = getAccentColorLevelInitial(colorMode);
    const accentColorValue = colors[accentColor][accentColorLevel];
    const bgHover = useColorModeValue("gray.50", "gray.600");
    return (
        <Box
            textAlign="center"
            my={6}
        >
            <NextLink href="/" passHref>
                <ChakraLink style={{textDecoration: "none"}}>
                    <Button
                        variant="outline"
                        _hover={{
                            bg: bgHover,
                        }}
                    >
                        <Flex
                            align="center"
                            justify="center"
                        >
                            <GithubIcon mr={1} />
                            <Text
                                textAlign="center"
                                fontFamily="Changa, system-ui, sans-serif"
                                fontWeight="300"
                            >
                                Powered by
                                <Text
                                    as="span"
                                    fontWeight="500"
                                    style={{
                                        color: accentColorValue,
                                    }}
                                >
                                    {' Coindrop'}
                                </Text>
                            </Text>
                        </Flex>

                    </Button>
                </ChakraLink>
            </NextLink>
        </Box>
    );
};

export default PoweredByCoindropLink;
