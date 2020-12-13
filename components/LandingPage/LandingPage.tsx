import { FunctionComponent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { Container, useDisclosure, Box, Flex, useTheme, Heading, Text } from '@chakra-ui/react';
import AuthModal from '../Auth/AuthModal';
import { CreatePiggybankInput } from '../CreatePiggybankInput/CreatePiggybankInput';
import { useUser } from '../../utils/auth/useUser';
import UseCasesList from './UseCasesList';
import GithubLink from './GithubLink';
import Footer from '../Footer/Footer';
import CompetitorComparisonTable from './CompetitorComparisonTable';
import { PaymentMethodTags } from './PaymentMethodTags';
import { Navbar } from '../Navbar/Navbar';

const ContentContainer: FunctionComponent = ({ children }) => (
    <Box
        my={12}
    >
        {children}
    </Box>
);

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
            title="Accept donations and tips anywhere. 100% Free, Zero Fees. | Coindrop"
            description="Supports virtually any payment method or cryptocurrency. Let the sender choose how to pay you."
        />
        <AuthModal
            isOpen={isAuthOpen}
        />
        <GithubLink />
        <Container
            maxW="lg"
            mx="auto"
            px={4}
            mb={6}
        >
            <Navbar />
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
                    The easiest way to accept donations and tips.
                </Heading>
                <Text textAlign="center" mt={2}>
                    List your payment methods and let the sender pay you directly. <b>100% free. Zero fees.</b>
                </Text>
                <Box
                    mt={2}
                >
                    <CreatePiggybankInput
                        createButtonColorScheme="orange"
                        onCancel={null}
                    />
                </Box>
            </Box>
            <ContentContainer>
                <Flex
                    justify="center"
                    mt={2}
                >
                    <UseCasesList />
                </Flex>
            </ContentContainer>
            <ContentContainer>
                <Heading mt={5} as="h2" size="lg" textAlign="center">
                    Supports virtually all payment methods
                </Heading>
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
                    Coindrop vs. the alternatives
                </Heading>
                <CompetitorComparisonTable />
            </ContentContainer>
            <Footer />
        </Container>
        </>
    );
};

export default LandingPage;
