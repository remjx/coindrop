import { FunctionComponent } from 'react';
import NextLink from 'next/link';
import { Box, Button, Link as ChakraLink, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { PiggyLogo } from '../Logo/Logo';

const PoweredByCoindropLink: FunctionComponent = () => {
    const bgHover = useColorModeValue("gray.50", "gray.600");
    return (
        <Box
            textAlign="center"
            my={6}
        >
            <NextLink href="/" passHref>
                <ChakraLink style={{textDecoration: "none"}}>
                    <Button
                        variant="ghost"
                        _hover={{
                            bg: bgHover,
                        }}
                    >
                        <Flex
                            align="center"
                            justify="center"
                        >
                            <PiggyLogo mr={1} boxSize="2rem" />
                            <Text>
                                Powered by Coindrop
                            </Text>
                        </Flex>

                    </Button>
                </ChakraLink>
            </NextLink>
        </Box>
    );
};

export default PoweredByCoindropLink;
