import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Button, useTheme, Heading, Text, Input, InputGroup, InputLeftAddon, Icon, Tag, TagIcon, TagLabel } from '@chakra-ui/core'
import Logo from '../Logo/Logo';

const PaymentMethodTag = ({ label, iconName, iconSize = "16px", color }) => (
    <Box mx={1} my={1}>
        <Tag size="lg">
            <Icon verticalAlign="top" name={iconName} color={color} size={iconSize} mr={2} />
            <TagLabel>{label}</TagLabel>
        </Tag>
    </Box>
)

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
                    Create a list of all your addresses. Let the sender choose how to pay.
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
                        ml={1}
                        variantColor="orange"
                    >
                        Create
                    </Button>
                </Flex>
                <Text
                    fontSize="xs"
                    textAlign="center"
                >
                    username can be changed later
                </Text>
                <Text>
                    Supports
                </Text>
                <Flex>
                    <PaymentMethodTag label="PayPal" iconName="paypal" color="#00457C" />
                    <PaymentMethodTag label="Venmo" iconName="venmo" color="#3D95CE" iconSize="32px" />
                    <PaymentMethodTag label="Bitcoin" iconName="btc" color="#F7931A" />
                    <PaymentMethodTag label="Bitcoin Cash" iconName="bitcoincash" color="#5DCB79" iconSize="22px" />
                    <PaymentMethodTag label="Bitcoin SV" iconName="bitcoinsv" color="#EAB41E" />
                    <PaymentMethodTag label="Litecoin" iconName="litecoin" color="#345d9d" />
                    <PaymentMethodTag label="Monero" iconName="monero" color="" />
                    <PaymentMethodTag label="Zcash" iconName="zcash" color="#000000" />
                </Flex>
            </Box>
        </Box>
    );
};

index.propTypes = {

};

index.defaultProps = {

};

export default index;
