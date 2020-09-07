import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Button, useTheme, Heading, Text, Input, InputGroup, InputLeftAddon } from '@chakra-ui/core'
import Logo from '../logo/Logo';

const index = (props) => {
    const theme = useTheme();
    return (
        <Box
            maxW="960px"
            mx="auto"
        >
            <Flex
                id="navbar"
                align="center"
                justify="space-between"
            >
                <Logo />
                <Flex>
                    <Button>
                        Log in
                    </Button>
                </Flex>
            </Flex>
            <Box
                border="1px solid"
                padding="10px"
                boxShadow={`5px 10px ${theme.colors.gray['200']}`}
                mt={6}
            >
                <Heading
                    textAlign="center"
                    color={theme.colors.gray['700']}
                >
                    Your shareable landing page for one-time payments and donations
                </Heading>
                <Text textAlign="center">
                    Let your users choose their most convenient way to pay you
                </Text>
                <Flex
                    align="center"
                    justify="center"
                    mt={4}
                    mb={1}
                >
                    <InputGroup>
                        <InputLeftAddon children="coindrop.to/" />
                        <Input roundedLeft="0" placeholder="username" />
                    </InputGroup>
                    <Button
                        variantColor="orange"
                    >
                        Create
                    </Button>
                </Flex>
                <Text
                    fontSize="xs"
                    textAlign="center"
                >
                    Username can be changed later
                </Text>
            </Box>
        </Box>
    );
};

index.propTypes = {

};

index.defaultProps = {

};

export default index;
