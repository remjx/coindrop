import { useEffect } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useDisclosure, Box, Flex, Button, useTheme, Heading, Text, Link, Icon, Tag, TagLabel } from '@chakra-ui/core';
import Logo from '../Logo/Logo';
import AuthModal from '../Auth/AuthModal';
import CreatePiggybankInput from '../CreatePiggybankInput/CreatePiggybankInput';
import { useUser } from '../../utils/auth/useUser';
import { githubUrl } from '../../src/settings';

const PaymentMethodTag = ({ label, iconName, iconSize, color, tagVariantColor }) => (
    <Box mx={1} my={1}>
        <Tag size="lg" variantColor={tagVariantColor}>
            <Icon verticalAlign="top" name={iconName} color={color} size={iconSize} mr={2} />
            <TagLabel py={1}>{label}</TagLabel>
        </Tag>
    </Box>
);
PaymentMethodTag.propTypes = {
    label: PropTypes.string.isRequired,
    iconSize: PropTypes.string,
    iconName: PropTypes.string.isRequired,
    color: PropTypes.string,
    tagVariantColor: PropTypes.string,
};
PaymentMethodTag.defaultProps = {
    iconSize: "16px",
    tagVariantColor: undefined,
    color: undefined,
};

const AddTag = () => (
    <NextLink href="/add" passHref>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link style={{textDecoration: "none"}}>
            <PaymentMethodTag label="Add" iconName="add" tagVariantColor="darkGray" />
        </Link>
    </NextLink>
);

const index = () => {
    const {
        isOpen: isAuthOpen,
        onOpen: onAuthOpen,
        onClose: onAuthClose,
    } = useDisclosure();
    const theme = useTheme();
    const router = useRouter();
    const { user } = useUser();
    useEffect(() => {
        if (router.pathname === '/auth') {
            onAuthOpen();
        } else {
            onAuthClose();
        }
    }, [router.pathname]);
    useEffect(() => {
        router.prefetch('/dashboard');
    }, []);
    useEffect(() => { // does this unnecessarily cause LandingPage to render before router.push()?
        if (
            user
            && router.pathname !== '/dashboard'
        ) {
            router.push('/dashboard');
        }
    }, [user, router.pathname]);
    return (
        <>
        <AuthModal
            isOpen={isAuthOpen}
            onClose={onAuthClose}
        />
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
                <Flex align="center">
                    <NextLink href="/auth">
                        <Button
                            mr={2}
                            isDisabled={router.pathname === '/auth'}
                        >
                            Log in
                        </Button>
                    </NextLink>
                    <Link href={githubUrl} target="_blank" rel="noreferrer">
                        <Icon name="github" size="32px" color={theme.colors.gray['500']} />
                    </Link>
                </Flex>
            </Flex>
            <Box
                border="1px solid"
                padding="10px"
                boxShadow={`5px 10px ${theme.colors.gray['200']}`}
                my={6}
                py={6}
            >
                <Heading
                    textAlign="center"
                    color={theme.colors.gray['700']}
                >
                    A shareable landing page for peer-to-peer payments
                </Heading>
                <Text textAlign="center" mt={2}>
                    Create a list of your addresses. Let the sender choose how to pay you.
                </Text>
                <Box
                    mt={4}
                    mb={1}
                >
                    <CreatePiggybankInput />
                </Box>
            </Box>
            <Text
                textAlign="center"
                mt={8}
                mb={4}
                fontSize="xl"
            >
                Coindrop supports virtually all:
            </Text>
            <Flex direction={['column', 'row']}>
                <Box>
                    <Heading as="h3" size="md" textAlign="center">
                        Apps
                    </Heading>
                    <Flex wrap="wrap" justify="center" mt={3}>
                        <PaymentMethodTag label="PayPal" iconName="payPal" />
                        <PaymentMethodTag label="Venmo" iconName="venmo" iconSize="32px" />
                        <PaymentMethodTag label="CashApp" iconName="cashApp" />
                        <PaymentMethodTag label="Zelle" iconName="zelle" />
                        <PaymentMethodTag label="Google Pay" iconName="googlePay" />
                        <PaymentMethodTag label="Apple Pay" iconName="applePay" />
                        <PaymentMethodTag label="Facebook Pay" iconName="facebookPay" />
                        <PaymentMethodTag label="Metal Pay" iconName="metalPay" />
                        <PaymentMethodTag label="Money Button" iconName="moneyButton" />
                        {/* <PaymentMethodTag label="HandCash" iconName="handCash" /> */}
                        <AddTag />
                    </Flex>
                </Box>
                <Box>
                    <Heading as="h3" size="md" textAlign="center">
                        Cryptocurrencies
                    </Heading>
                    <Flex wrap="wrap" justify="center" mt={3}>
                        <PaymentMethodTag label="Bitcoin" iconName="bitcoinBTC" />
                        <PaymentMethodTag label="Bitcoin Cash" iconName="bitcoinBCH" iconSize="22px" />
                        <PaymentMethodTag label="Bitcoin SV" iconName="bitcoinBSV" />
                        <PaymentMethodTag label="Ethereum" iconName="ethereum" />
                        <PaymentMethodTag label="Litecoin" iconName="litecoin" />
                        <PaymentMethodTag label="Monero" iconName="monero" />
                        <PaymentMethodTag label="Zcash" iconName="zcash" />
                        <PaymentMethodTag label="Dash" iconName="dash" />
                        <PaymentMethodTag label="Tezos" iconName="tezos" />
                        <PaymentMethodTag label="Dogecoin" iconName="dogecoin" />
                        <PaymentMethodTag label="Cardano" iconName="cardano" />
                        <PaymentMethodTag label="Decred" iconName="decred" />
                        <AddTag />
                    </Flex>
                </Box>
            </Flex>
        </Box>
        </>
    );
};

export default index;
