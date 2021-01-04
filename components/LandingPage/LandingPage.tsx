import { useEffect, FC } from 'react';
import { useRouter } from 'next/router';
import { Container, useDisclosure, Center, Box, Flex, Text, Link } from '@chakra-ui/react';
import cookies from 'js-cookie';
import Image from 'next/image';
import AuthModal from '../Auth/AuthModal';
import { CreatePiggybankInput } from '../CreatePiggybankInput/CreatePiggybankInput';
import { useUser } from '../../utils/auth/useUser';
import Footer from '../Footer/Footer';
import { Navbar } from '../Navbar/Navbar';
import { GithubIcon } from '../Icons/CustomIcons';
import { githubUrl } from '../../src/settings';
import { PaymentMethodContainer } from './PaymentMethodContainer';
import { HeaderFooterContainer } from './HeaderFooterContainer';
import { ContentContainer } from './ContentContainer';
import { ContentContainerHeading } from './ContentContainerHeading';
import { HeadingTextPrimary } from './HeadingTextPrimary';

type Props = {
    headingTextPrimaryPreUnderline: string
    headingTextPrimaryUnderline: string
    headingTextPrimaryPostUnderline: string
    headingTextSecondary: string
    headingTextTertiary: string
    smartphoneMockupImagePublicPath: string
    showSubscriptionPlatforms: boolean
    shareOptions: FC
    shareOptionsHeading: string
    advertiseOpenSource: boolean
    getStartedText: string
    smartphoneMockupImageWidth: number
    smartphoneMockupImageHeight: number
}

const LandingPage: FC<Props> = ({
    headingTextPrimaryPreUnderline,
    headingTextPrimaryUnderline,
    headingTextPrimaryPostUnderline,
    headingTextSecondary,
    headingTextTertiary,
    smartphoneMockupImagePublicPath,
    showSubscriptionPlatforms,
    shareOptions,
    shareOptionsHeading,
    advertiseOpenSource,
    getStartedText,
    smartphoneMockupImageWidth,
    smartphoneMockupImageHeight,
}) => {
    const {
        isOpen: isAuthOpen,
        onOpen: onAuthOpen,
        onClose: onAuthClose,
    } = useDisclosure();
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
        <AuthModal
            isOpen={isAuthOpen}
        />
        <HeaderFooterContainer>
            <Navbar />
        </HeaderFooterContainer>
        <Container
            maxW="100%"
            mx="auto"
            px={4}
            mb={6}
        >
            <Container
                my="3rem"
                maxW="98em" // there is no theme.breakpoints.2xl
            >
                <HeadingTextPrimary
                    textPreUnderline={headingTextPrimaryPreUnderline}
                    textUnderline={headingTextPrimaryUnderline}
                    textPostUnderline={headingTextPrimaryPostUnderline}
                />
                <Text fontSize="lg" textAlign="center" mt={3}>
                    {headingTextSecondary}
                </Text>
                <Text fontSize="lg" textAlign="center" mt={2}>
                    <b>{headingTextTertiary}</b>
                </Text>
                <Center mt={8}>
                    <Image
                        src={smartphoneMockupImagePublicPath}
                        alt="Smartphone mockup"
                        height={smartphoneMockupImageHeight}
                        width={smartphoneMockupImageWidth}
                    />
                </Center>
            </Container>
            <ContentContainer>
                <ContentContainerHeading withThroughline>
                    ➀ Pick a custom URL
                </ContentContainerHeading>
                <Box
                    mt={8}
                >
                    <CreatePiggybankInput
                        createButtonColorScheme="orange"
                        onCancel={null}
                        instanceId="top"
                        buttonText="Check availability"
                    />
                </Box>
            </ContentContainer>
            <ContentContainer>
                <ContentContainerHeading withThroughline>
                    ➁ Add your payment methods
                </ContentContainerHeading>
                <Flex
                    direction={['column', 'row']}
                    wrap="wrap"
                    maxW="80%"
                    mx="auto"
                >
                    <PaymentMethodContainer title="Digital wallets" paymentMethodCategory="digital-wallet" />
                    <PaymentMethodContainer title="Digital assets" paymentMethodCategory="digital-asset" />
                    {showSubscriptionPlatforms && (
                        <PaymentMethodContainer title="Subscription platforms" paymentMethodCategory="subscription-platform" />
                    )}
                </Flex>
            </ContentContainer>
            <ContentContainer>
                <ContentContainerHeading withThroughline>
                    ➂ {shareOptionsHeading}
                </ContentContainerHeading>
                {shareOptions}
            </ContentContainer>
            {advertiseOpenSource && (
                <ContentContainer
                    boxProps={{
                        borderRadius: '16px',
                        position: 'relative',
                    }}
                >
                    <ContentContainerHeading>
                        Open-Source
                    </ContentContainerHeading>
                    <Flex align="center" justify="center" mt={4}>
                        <GithubIcon
                            opacity={0.9}
                            boxSize="72px"
                            mr={4}
                        />
                        <Text
                            fontSize="lg"
                        >
                            {'The source code for Coindrop is publicly available on '}
                            <Link isExternal href={githubUrl}>
                                Github
                            </Link>
                        </Text>
                    </Flex>
                </ContentContainer>
            )}
            <ContentContainer>
                <ContentContainerHeading>
                    Get started 🚀
                </ContentContainerHeading>
                <Text textAlign="center" fontSize="lg">
                    {getStartedText}
                </Text>
                <Box mt={2}>
                    <CreatePiggybankInput
                        createButtonColorScheme="orange"
                        onCancel={null}
                        instanceId="bottom"
                        buttonText="Create"
                    />
                </Box>
            </ContentContainer>
        </Container>
        <HeaderFooterContainer>
            <Footer />
        </HeaderFooterContainer>
        </>
    );
};

export default LandingPage;
