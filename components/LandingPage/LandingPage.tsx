import { FunctionComponent, useEffect, FC } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { Container, useDisclosure, Center, Box, Flex, useTheme, Heading, Text, Link, BoxProps, HeadingProps, useColorMode } from '@chakra-ui/react';
import cookies from 'js-cookie';
import QRCode from 'qrcode.react';
import AuthModal from '../Auth/AuthModal';
import { CreatePiggybankInput } from '../CreatePiggybankInput/CreatePiggybankInput';
import { useUser } from '../../utils/auth/useUser';
import Footer from '../Footer/Footer';
import { PaymentMethodTags } from './PaymentMethodTags';
import { Navbar } from '../Navbar/Navbar';
import { Category } from '../../src/paymentMethods';
import { PiggyLogo } from '../Logo/Logo';
import { GithubIcon, ClickIcon } from '../Icons/CustomIcons';
import { githubUrl } from '../../src/settings';

const HeaderFooterContainer: FC = ({ children }) => (
    <Container
        maxW="xl"
    >
        {children}
    </Container>
);

type ContentContainerProps = {
    boxProps?: BoxProps
}

const ContentContainer: FC<ContentContainerProps> = ({ boxProps, children }) => (
    <Container
        my={12}
        maxW="xl"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...boxProps}
    >
        {children}
    </Container>
);

type ContentContainerHeadingProps = {
    headingProps?: HeadingProps
}
const ContentContainerHeading: FC<ContentContainerHeadingProps> = ({ headingProps, children }) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Heading
        as="h2"
        size="xl"
        textAlign="center"
        mb={2}
        // fontFamily="Calistoga; Segoe-UI; sans-serif"
        // fontWeight="500"
        {...headingProps}
    >
        {children}
    </Heading>
);

type PaymentMethodContainerProps = {
    title: string
    paymentMethodCategory: Category
}

const PaymentMethodContainer: FC<PaymentMethodContainerProps> = ({ title, paymentMethodCategory }) => (
    <Flex
        flex={[null, "1 0 100%", "1 0 50%", "1 0 33.33%"]}
        direction="column"
        mt={6}
    >
        <Heading as="h3" size="md" textAlign="center">
            {title}
        </Heading>
        <Flex wrap="wrap" justify="center" mt={3}>
            <PaymentMethodTags category={paymentMethodCategory} />
        </Flex>
    </Flex>
);

const ShareOption: FC<{title: string, description: string}> = ({ title, description, children }) => (
    <Flex
        direction="column"
        flex={[null, "1 0 50%", "1 0 50%", "1 0 33.33%"]}
    >
        <Heading textAlign="center" as="h3" size="lg">
            {title}
        </Heading>
        <Text textAlign="center">
            {description}
        </Text>
        <Flex mt={4} justify="center" align="center" direction="column" h="150px">
            {children}
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
        <HeaderFooterContainer>
            <Navbar />
        </HeaderFooterContainer>
        <Container
            maxW="100%"
            mx="auto"
            px={4}
            mb={6}
        >
            <Box
                my="3rem"
            >
                <Center>
                    <PiggyLogo boxSize="150px" />
                </Center>
                <Heading
                    textAlign="center"
                    as="h1"
                    size="2xl"
                >
                    The best way to accept donations.
                </Heading>
                <Text fontSize="lg" textAlign="center" mt={4}>
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
            <Box
                maxW="80%"
                mx="auto"
            >
                <ContentContainerHeading>
                    Supports virtually all payment methods
                </ContentContainerHeading>
                <Flex
                    direction={['column', 'row']}
                    wrap="wrap"
                >
                    <PaymentMethodContainer title="Digital wallets" paymentMethodCategory="digital-wallet" />
                    <PaymentMethodContainer title="Digital assets" paymentMethodCategory="digital-asset" />
                    <PaymentMethodContainer title="Subscription platforms" paymentMethodCategory="subscription-platform" />
                </Flex>
            </Box>
            <ContentContainer
                boxProps={{
                    py: 6,
                    borderRadius: '16px',
                    position: 'relative',
                }}
            >
                <Flex align="center" justify="center">
                    <GithubIcon opacity={0.5} boxSize="96px" mr={4} left={0} top={0} />
                    <Box>
                        <ContentContainerHeading
                            headingProps={{
                                color: theme.colors.gray['50'],
                            }}
                        >
                            Open-Source
                        </ContentContainerHeading>
                        <Text
                            textAlign="center"
                            color={theme.colors.gray['50']}
                        >
                            {'The source code for this website is publicly available on '}
                            <Link isExternal href={githubUrl}>
                                <u>
                                    Github
                                </u>
                            </Link>
                        </Text>
                    </Box>
                </Flex>
            </ContentContainer>
            <ContentContainer>
                <ContentContainerHeading>
                    Use it anywhere
                </ContentContainerHeading>
                <Flex
                    direction={["column", "row"]}
                    wrap="wrap"
                >
                    <ShareOption title="Link" description="coindrop.to/your-name">
                        <>
                        <ClickIcon boxSize="85px" />
                        </>
                    </ShareOption>
                    <ShareOption title="Button" description="Embed on your website">
                        <>
                        <Box w="228px" h="57px">
                            <Link href="https://coindrop.to/satoshi-nakamoto" isExternal>
                                <img src="/embed-button.png" style={{borderRadius: "10px", height: "57px", width: "229px"}} alt="Coindrop.to me" />
                            </Link>
                        </Box>
                        </>
                    </ShareOption>
                    <ShareOption title="QR Code" description="Donors can scan with a smartphone">
                        <>
                        <QRCode
                            value="https://coindrop.to/satoshi-nakamoto"
                            size={150}
                            imageSettings={{
                                src: "/logo/piggy-64.png",
                                x: null,
                                y: null,
                                height: 64,
                                width: 64,
                                excavate: true,
                            }}
                        />
                        </>
                    </ShareOption>
                </Flex>
            </ContentContainer>
        </Container>
        <HeaderFooterContainer>
            <Footer />
        </HeaderFooterContainer>
        </>
    );
};

export default LandingPage;
