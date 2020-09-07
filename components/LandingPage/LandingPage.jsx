import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Button, useTheme, Heading, Text, Input, InputGroup, InputLeftAddon, Icon, Tag, TagIcon, TagLabel } from '@chakra-ui/core'
import Logo from '../Logo/Logo';

const PaymentMethodTag = ({ label, iconName, iconSize = "16px", color }) => (
    <Box mx={1} my={1}>
        <Tag size="lg">
            <Icon verticalAlign="top" name={iconName} color={color} size={iconSize} mr={2} />
            <TagLabel py={1}>{label}</TagLabel>
        </Tag>
    </Box>
)

const index = (props) => {
    const theme = useTheme();
    return (
        <Box
            maxW="960px"
            mx="auto"
            px={4}
            mb={6}
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
                    Create a list of your addresses. Let the sender choose how to pay you.
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
                <Flex wrap="wrap">
                    <PaymentMethodTag label="PayPal" iconName="paypal" color="#00457C" />
                    <PaymentMethodTag label="Venmo" iconName="venmo" color="#3D95CE" iconSize="32px" />
                    <PaymentMethodTag label="CashApp" iconName="cashapp" />
                    <PaymentMethodTag label="Zelle" iconName="zelle" color="#6C16D4" />
                    <PaymentMethodTag label="Google Pay" iconName="googlepay" />
                    <PaymentMethodTag label="Apple Pay" iconName="applepay" color="#000" />
                    <PaymentMethodTag label="Facebook Pay" iconName="facebookpay" color="#4267B2" />
                    <PaymentMethodTag label="Bitcoin" iconName="btc" color="#F7931A" />
                    <PaymentMethodTag label="Bitcoin Cash" iconName="bitcoincash" color="#5DCB79" iconSize="22px" />
                    <PaymentMethodTag label="Bitcoin SV" iconName="bitcoinsv" color="#EAB41E" />
                    <PaymentMethodTag label="Ethereum" iconName="ethereum" />
                    <PaymentMethodTag label="Monero" iconName="monero" />
                    <PaymentMethodTag label="Zcash" iconName="zcash" />
                    <PaymentMethodTag label="Dash" iconName="dash" color="#008DE4" />
                    <PaymentMethodTag label="Tezos" iconName="tezos" color="#2C7DF7" />
                    <PaymentMethodTag label="Litecoin" iconName="litecoin" color="#345d9d" />
                    <PaymentMethodTag label="Dogecoin" iconName="dogecoin" />
                    <PaymentMethodTag label="Cardano" iconName="cardano" color="#0033AD" />
                    <PaymentMethodTag label="Decred" iconName="decred" />
                    <PaymentMethodTag label="Metal Pay" iconName="metalpay" />
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
