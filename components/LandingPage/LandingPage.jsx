import { useEffect } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { Image, useDisclosure, Box, Flex, Button, useTheme, Heading, Text, Link, Icon } from '@chakra-ui/core';
import Typewriter from './Typewriter';
import Logo from '../Logo/Logo';
import AuthModal from '../Auth/AuthModal';
import CreatePiggybankInput from '../CreatePiggybankInput/CreatePiggybankInput';
import { useUser } from '../../utils/auth/useUser';
import { twitterUrl } from '../../src/settings';
import { paymentMethodCategories, paymentMethodNames } from '../../src/paymentMethods';
import UseCasesList from './UseCasesList';
import FAQ from './FAQ';
import styles from './LandingPage.module.scss';
import PaymentMethodTag from './PaymentMethodTag';
import GithubLink from './GithubLink';

const ContentContainer = ({ children }) => (
    <Box
        my={12}
    >
        {children}
    </Box>
);
ContentContainer.propTypes = {
    children: PropTypes.any.isRequired,
};

const PaymentMethodTagAndManyMore = () => (
    <PaymentMethodTag
        label="... and many more"
        color="gray"
        tagVariantColor="gray"
    />
);

const index = () => {
    const {
        isOpen: isAuthOpen,
        onOpen: onAuthOpen,
        onClose: onAuthClose,
    } = useDisclosure();
    const theme = useTheme();
    const green = theme.colors.green['400'];
    const red = theme.colors.red['500'];
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
    const paymentMethodCategoriesArr = Object.entries(paymentMethodCategories);
    const PaymentMethodTags = ({ category }) => paymentMethodCategoriesArr
        .filter(([paymentMethodId, paymentMethodCategory]) => paymentMethodCategory === category)
        .map(([paymentMethodId]) => (
            <PaymentMethodTag
                label={paymentMethodNames[paymentMethodId]}
                iconName={paymentMethodId}
                iconSize={paymentMethodId === 'venmo' ? "32px" : paymentMethodId === 'bitcoinBCH' ? "22px" : undefined}
            />
        ));
    return (
        <>
        <NextSeo
            title="Coindrop: zero-fee webpages for peer-to-peer payments, donations, and tips"
            description="Accept peer-to-peer donations anywhere on the web or in real life"
        />
        <AuthModal
            isOpen={isAuthOpen}
            onClose={onAuthClose}
        />
        <GithubLink />
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
                    as="h1"
                >
                    {'Your '}
                    <span style={{textDecoration: "underline"}}>
                        free
                    </span>
                    {' webpage for '}
                    <span style={{whiteSpace: "nowrap" }}>peer-to-peer</span>
                    {' '}
                    <Box display="inline-block">
                        <Typewriter />
                    </Box>
                </Heading>
                <Text textAlign="center" mt={2}>
                    Enter your addresses. Let the sender choose how to pay you. Zero fees.
                </Text>
                <Box
                    mt={2}
                >
                    <CreatePiggybankInput />
                </Box>
                <Text
                    fontSize="sm"
                    textAlign="center"
                    mt={4}
                >
                    {'Coindrop is currently in beta. '}
                    <Link
                        href={twitterUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <b>Request an invite</b>
                    </Link>
                    .
                </Text>
            </Box>
            <ContentContainer>
                <Heading as="h2" size="lg" textAlign="center">
                    Perfect for...
                </Heading>
                <Flex
                    justify="center"
                    mt={2}
                >
                    <UseCasesList />
                </Flex>
            </ContentContainer>
            <ContentContainer>
                <Heading mt={5} as="h2" size="lg" textAlign="center">
                    Supports virtually <u>all</u> payment methods
                </Heading>
                <Text textAlign="center">
                    Pick &amp; choose which to feature on your page
                </Text>
                <Flex direction={['column', 'row']}>
                    <Box
                        mt={4}
                    >
                        <Heading as="h3" size="md" textAlign="center">
                            Apps
                        </Heading>
                        <Flex wrap="wrap" justify="center" mt={3}>
                            <PaymentMethodTags category="app" />
                            <PaymentMethodTagAndManyMore />
                        </Flex>
                    </Box>
                    <Box
                        mt={4}
                    >
                        <Heading as="h3" size="md" textAlign="center">
                            Digital assets
                        </Heading>
                        <Flex wrap="wrap" justify="center" mt={3}>
                            <PaymentMethodTags category="digital-asset" />
                            <PaymentMethodTagAndManyMore />
                        </Flex>
                    </Box>
                </Flex>
            </ContentContainer>
            <ContentContainer>
                <Heading mt={5} as="h2" size="lg" textAlign="center">
                    Alternatives
                </Heading>
                <Text
                    textAlign="center"
                    mb={2}
                >
                    Some other platforms you may consider
                </Text>
                <Box>
                    <Flex justify="center" textAlign="center">
                        <table style={{borderSpacing: '10px'}} className={styles.comparisontable}>
                            <tr>
                                <th> </th>
                                <th>
                                    <Flex align="center">
                                        Coindrop
                                        <Image ml={1} src="/piggy-question-256.png" height="19px" width="19px" alt="Coindrop piggybank logo" />
                                    </Flex>
                                </th>
                                <th>
                                    Ko-fi
                                    <Icon ml={1} name="kofi" />
                                </th>
                                <th>
                                Buy Me A Coffee
                                    <Icon ml={1} name="buymeacoffee" />
                                </th>
                                <th>
                                    Patreon
                                    <Icon ml={1} name="patreon" />
                                </th>
                            </tr>
                            <tr>
                                <td># Pages per account</td>
                                <td style={{backgroundColor: green, color: '#FFFFFF'}}>Unlimited</td>
                                <td style={{backgroundColor: red}}>1</td>
                                <td style={{backgroundColor: red}}>1</td>
                                <td style={{backgroundColor: red}}>1</td>
                            </tr>
                            <tr>
                                <td>Payment methods</td>
                                <td style={{backgroundColor: green}}>Any</td>
                                <td style={{backgroundColor: red}}>PayPal or Credit Card</td>
                                <td style={{backgroundColor: red}}>Credit card</td>
                                <td style={{backgroundColor: red}}>Credit card</td>
                            </tr>
                            <tr>
                                <td>Open-source</td>
                                <td style={{backgroundColor: green}}>Yes</td>
                                <td style={{backgroundColor: red}}>No</td>
                                <td style={{backgroundColor: red}}>No</td>
                                <td style={{backgroundColor: red}}>No</td>
                            </tr>
                            <tr>
                                <td>Fees</td>
                                <td style={{backgroundColor: green}}>Free</td>
                                <td style={{backgroundColor: green}}>Freemium</td>
                                <td style={{backgroundColor: red}}>5%</td>
                                <td style={{backgroundColor: red}}>5-12%</td>
                            </tr>
                            <tr>
                                <td>Memberships</td>
                                <td style={{backgroundColor: red}}>No</td>
                                <td style={{backgroundColor: red}}>$9/mo</td>
                                <td style={{backgroundColor: green}}>Yes</td>
                                <td style={{backgroundColor: green}}>Yes</td>
                            </tr>
                        </table>
                    </Flex>
                </Box>
            </ContentContainer>
            <ContentContainer>
                <Heading mt={5} as="h2" size="lg" textAlign="center">
                    FAQ
                </Heading>
                <Text
                    textAlign="center"
                    mb={5}
                >
                    Frequently Asked Questions
                </Text>
                <FAQ />
            </ContentContainer>
        </Box>
        </>
    );
};

export default index;
