import { FunctionComponent, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useDisclosure, Box, Flex, useTheme, Heading, Text, Link } from '@chakra-ui/react';
import Typewriter from './Typewriter';
import AuthModal from '../Auth/AuthModal';
import { CreatePiggybankInput } from '../CreatePiggybankInput/CreatePiggybankInput';
import { useUser } from '../../utils/auth/useUser';
import { twitterUrl } from '../../src/settings';
import UseCasesList from './UseCasesList';
import FAQ from './FAQ';
import GithubLink from './GithubLink';
import Footer from '../Footer/Footer';
import CompetitorComparisonTable from './CompetitorComparisonTable';
import { PaymentMethodTags } from './PaymentMethodTags';
import { Navbar } from '../Navbar/Navbar';

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

const LandingPage: FunctionComponent = () => {
    const {
        isOpen: isAuthOpen,
        onOpen: onAuthOpen,
        onClose: onAuthClose,
    } = useDisclosure();
    const theme = useTheme();
    const router = useRouter();
    const { user } = useUser();
    useEffect(() => { // does this unnecessarily cause LandingPage to render before router.push()?
        if (user) {
            router.push('/dashboard');
        }
    }, [user]);
    useEffect(() => {
        if (router.query.auth) {
            onAuthOpen();
        } else {
            onAuthClose();
        }
    }, [router.query]);
    return (
        <>
        <NextSeo
            title="Coindrop: free webpages for accepting peer-to-peer payments, donations, and tips"
            description="Accept peer-to-peer donations anywhere on the web or in real life with zero fees"
        />
        <AuthModal
            isOpen={isAuthOpen}
        />
        <GithubLink />
        <Box
            maxW="960px"
            mx="auto"
            px={4}
            mb={6}
        >
            <Navbar isAuthOpen={isAuthOpen} />
            <Box
                border="1px solid"
                padding="10px"
                boxShadow={`5px 10px 5px 0 ${theme.colors.gray['200']}`}
                my={6}
                py={6}
            >
                <Heading
                    textAlign="center"
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
                    <CreatePiggybankInput
                        createButtonColorScheme="orange"
                        onCancel={null}
                    />
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
                    Supports virtually
                    {' '}
                    <u>all</u>
                    {' '}
                    payment methods
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
                    Other platforms you may consider
                </Text>
                <CompetitorComparisonTable />
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
            <Footer />
        </Box>
        </>
    );
};

export default LandingPage;
