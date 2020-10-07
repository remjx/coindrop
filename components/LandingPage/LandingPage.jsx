import { useEffect } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Image, useDisclosure, Box, Flex, Button, useTheme, Heading, Text, Link, Icon, Tag, TagLabel } from '@chakra-ui/core';
import Typewriter from 'typewriter-effect';
import Logo from '../Logo/Logo';
import AuthModal from '../Auth/AuthModal';
import CreatePiggybankInput from '../CreatePiggybankInput/CreatePiggybankInput';
import { useUser } from '../../utils/auth/useUser';
import { githubUrl, twitterUrl } from '../../src/settings';
import { paymentMethodCategories, paymentMethodNames } from '../../src/paymentMethods';
import UseCasesList from './UseCasesList';
import FAQ from './FAQ';
import styles from './LandingPage.module.scss';

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
    <Link
        style={{textDecoration: "none"}}
        href="https://github.com/markjackson02/coindrop/issues/new?assignees=markjackson02&labels=enhancement&template=new_payment_method.md&title="
        target="_blank"
    >
        <PaymentMethodTag label="Add" iconName="add" tagVariantColor="darkGray" />
    </Link>
);

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

const index = () => {
    const {
        isOpen: isAuthOpen,
        onOpen: onAuthOpen,
        onClose: onAuthClose,
    } = useDisclosure();
    const theme = useTheme();
    const green = theme.colors.green['400'];
    // const yellow = theme.colors.yellow['500'];
    // const orange = theme.colors.orange['500'];
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
                    as="h1"
                >
                    {'Create a '}
                    <span style={{textDecoration: "underline"}}>
                        zero-fee
                    </span>
                    {' webpage for accepting '}
                    <Typewriter
                        options={{
                            strings: ['payments', 'donations', 'tips', 'gifts'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </Heading>
                <Text textAlign="center" mt={2}>
                    Enter your addresses. Let the sender choose how to pay you.
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
                            <AddTag />
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
                            <AddTag />
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
                    // color={theme.colors.gray['500']}
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
                                        <Image ml={1} src="/piggy-question-256.png" height="19px" width="19px" />
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
                                <td style={{backgroundColor: green, color: '#FFFFFF'}}>Infinite</td>
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
