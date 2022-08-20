import { useEffect, FC } from 'react';
import { useRouter } from 'next/router';
import { Container, useDisclosure, Center, Flex, Text, Link, Button } from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import AuthModal from '../Auth/AuthModal';
import Footer from '../Footer/Footer';
import { Navbar } from '../Navbar/Navbar';
import { GithubIcon } from '../Icons/CustomIcons';
import { githubUrl } from '../../src/settings';
import { PaymentMethodContainer } from './PaymentMethodContainer';
import { HeaderFooterContainer } from './HeaderFooterContainer';
import { ContentContainer } from './ContentContainer';
import { ContentContainerHeading } from './ContentContainerHeading';
import { HeadingTextPrimary } from './HeadingTextPrimary';
import EditUrlInput from '../PublicPiggybankPage/EditPiggybankModal/EditUrlInput';
import { AdditionalValidationProvider } from '../PublicPiggybankPage/EditPiggybankModal/AdditionalValidationContext';

type Props = {
    headingTextPrimaryPreUnderline: string
    headingTextPrimaryUnderline: string
    headingTextPrimaryPostUnderline: string
    headingTextSecondary: string
    headingTextTertiary: string
    smartphoneMockupImagePublicPath: string
    showSubscriptionPlatforms: boolean
    ShareOptions: FC
    shareOptionsHeading: string
    advertiseOpenSource: boolean
    getStartedText: string
    smartphoneMockupImageWidth: number
    smartphoneMockupImageHeight: number
    logoSubtitle: string | null
}

const LandingPage: FC<Props> = ({
    headingTextPrimaryPreUnderline,
    headingTextPrimaryUnderline,
    headingTextPrimaryPostUnderline,
    headingTextSecondary,
    headingTextTertiary,
    smartphoneMockupImagePublicPath,
    showSubscriptionPlatforms,
    ShareOptions,
    shareOptionsHeading,
    advertiseOpenSource,
    getStartedText,
    smartphoneMockupImageWidth,
    smartphoneMockupImageHeight,
    logoSubtitle,
}) => {
    const {
        isOpen: isAuthOpen,
        onOpen: onAuthOpen,
        onClose: onAuthClose,
    } = useDisclosure();
    const router = useRouter();
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
            <Navbar
                logoSubtitle={logoSubtitle}
            />
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
                    ➀ Pick a Custom URL
                </ContentContainerHeading>
                    <AdditionalValidationProvider>

                <Center
                    mt={8}
                >
                        <EditUrlInput />

                </Center>
                    </AdditionalValidationProvider>
            </ContentContainer>
            <ContentContainer>
                <ContentContainerHeading withThroughline>
                    ➁ Add Your Payment Methods
                </ContentContainerHeading>
                <Flex
                    direction={['column', 'row']}
                    wrap="wrap"
                    maxW="80%"
                    mx="auto"
                >
                    <PaymentMethodContainer title="Payment Apps" paymentMethodCategory="digital-wallet" />
                    <PaymentMethodContainer title="Digital Assets" paymentMethodCategory="digital-asset" />
                    {showSubscriptionPlatforms && (
                        <PaymentMethodContainer title="Subscription Platforms" paymentMethodCategory="subscription-platform" />
                    )}
                </Flex>
            </ContentContainer>
            <ContentContainer>
                <ContentContainerHeading withThroughline>
                    ➂ {shareOptionsHeading}
                </ContentContainerHeading>
                <ShareOptions />
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
                                <u>Github</u>
                            </Link>
                        </Text>
                    </Flex>
                </ContentContainer>
            )}
            <ContentContainer>
                <ContentContainerHeading>
                    Get Started 🤑
                </ContentContainerHeading>
                <Text textAlign="center" fontSize="lg">
                    {getStartedText}
                </Text>
                <Center mt={4}>
                    <NextLink href="/?auth=1" shallow>
                        <Button
                            colorScheme="green"
                        >
                            Create a Coindrop
                        </Button>
                    </NextLink>
                </Center>
            </ContentContainer>
        </Container>
        <HeaderFooterContainer>
            <Footer />
        </HeaderFooterContainer>
        </>
    );
};

export default LandingPage;
