import { FunctionComponent, useEffect, FC } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { Container, useDisclosure, Box, Flex, useTheme, Heading, Text, Link } from '@chakra-ui/react';
import cookies from 'js-cookie';
import AuthModal from '../Auth/AuthModal';
import { CreatePiggybankInput } from '../CreatePiggybankInput/CreatePiggybankInput';
import { useUser } from '../../utils/auth/useUser';
import UseCasesList from './UseCasesList';
import GithubLink from './GithubLink';
import Footer from '../Footer/Footer';
// import CompetitorComparisonTable from './CompetitorComparisonTable';
import { PaymentMethodTags } from './PaymentMethodTags';
import { Navbar } from '../Navbar/Navbar';
import { Category } from '../../src/paymentMethods';
import { GithubIcon } from '../Icons/CustomIcons';
import { githubUrl } from '../../src/settings';

const ContentContainer: FunctionComponent = ({ children }) => (
    <Box
        my={12}
    >
        {children}
    </Box>
);

const ContentContainerHeading: FC = ({ children }) => (
    <Heading mt={5} as="h2" size="lg" textAlign="center">
        {children}
    </Heading>
);

type PaymentMethodContainerProps = {
    title: string
    paymentMethodCategory: Category
}

const PaymentMethodContainer: FC<PaymentMethodContainerProps> = ({ title, paymentMethodCategory }) => (
    <Flex
        mt={4}
        flex="1 0 50%"
        direction="column"
    >
        <Heading as="h3" size="md" textAlign="center">
            {title}
        </Heading>
        <Flex wrap="wrap" justify="center" mt={3}>
            <PaymentMethodTags category={paymentMethodCategory} />
        </Flex>
    </Flex>
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
    useEffect(() => {
        if (user) {
            const pendingLoginCreatePiggybankPath = cookies.get('pendingLoginCreatePiggybankPath');
            if (pendingLoginCreatePiggybankPath) {
                router.push('/create');
            } else {
                router.push('/dashboard');
            }
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
                    List your payment methods. Let the sender pay you directly. <b>100% free. Zero fees.</b>
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
                <ContentContainerHeading>
                    Simple sharing options
                </ContentContainerHeading>
                <Text>
                    Copy &amp; Paste your URL anywhere, like this:
                    <Link isExternal href="https://coindrop.to/satoshi-nakamoto">coindrop.to/satoshi-nakamoto</Link>
                </Text>
                <Text>
                    Embed a button on your website:
                </Text>
                <Box w="228px" h="57px">
                    <Link href="https://coindrop.to/satoshi-nakamoto" isExternal>
                        <img src="/embed-button.png" style={{borderRadius: "10px", height: "57px", width: "229px"}} alt="Coindrop.to me" />
                    </Link>
                </Box>
            </ContentContainer>
            <ContentContainer>
                <ContentContainerHeading>
                    Supports virtually any payment method
                </ContentContainerHeading>
                <Flex
                    direction={['column', 'row']}
                    wrap="wrap"
                >
                    <PaymentMethodContainer title="Digital wallets" paymentMethodCategory="digital-wallet" />
                    <PaymentMethodContainer title="Digital assets" paymentMethodCategory="digital-asset" />
                    <PaymentMethodContainer title="Creator platforms" paymentMethodCategory="creator-platform" />
                </Flex>
            </ContentContainer>
            <ContentContainer>
                <ContentContainerHeading>
                    Open-Source
                </ContentContainerHeading>
                <Flex align="center" justify="center">
                    <GithubIcon boxSize="96px" mr={4} />
                    <Text
                        textAlign="center"
                    >
                        {'All code for this website is publicly available on '}
                        <Link isExternal href={githubUrl}>
                            Github
                        </Link>
                        .
                    </Text>
                </Flex>
            </ContentContainer>
            {/* <ContentContainer>
                <Heading mt={5} as="h2" size="lg" textAlign="center">
                    Coindrop vs. the alternatives
                </Heading>
                <CompetitorComparisonTable />
            </ContentContainer> */}
            <Footer />
        </Container>
        </>
    );
};

export default LandingPage;
