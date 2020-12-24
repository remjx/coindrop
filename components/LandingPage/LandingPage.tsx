import { FunctionComponent, useEffect, useState, FC } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { Container, useDisclosure, Center, Box, Flex, Heading, Text, Link, BoxProps, HeadingProps, useColorMode, useTheme } from '@chakra-ui/react';
import cookies from 'js-cookie';
import QRCode from 'qrcode.react';
import Image from 'next/image';
import AuthModal from '../Auth/AuthModal';
import { CreatePiggybankInput } from '../CreatePiggybankInput/CreatePiggybankInput';
import { useUser } from '../../utils/auth/useUser';
import Footer from '../Footer/Footer';
import { PaymentMethodTags } from './PaymentMethodTags';
import { Navbar } from '../Navbar/Navbar';
import { Category } from '../../src/paymentMethods';
import { GithubIcon } from '../Icons/CustomIcons';
import { githubUrl } from '../../src/settings';
import styles from './LandingPage.module.scss';

const QRCodeExample: FC = () => {
    const [environment, setEnvironment] = useState<'browser' | 'server'>('server');
    useEffect(() => {
        setEnvironment('browser');
    }, []);
    return (
        <QRCode
            value="https://coindrop.to/satoshi-nakamoto"
            size={150}
            imageSettings={environment === 'browser' ? {
                src: "/logo/piggy-64.png",
                x: null,
                y: null,
                height: 64,
                width: 64,
                excavate: true,
            } : undefined}
        />
    );
};

const HeaderFooterContainer: FC = ({ children }) => {
    const theme = useTheme();
    return (
        <Container
            maxW={theme.breakpoints.xl}
        >
            {children}
        </Container>
    );
};

type ContentContainerProps = {
    boxProps?: BoxProps
}

const ContentContainer: FC<ContentContainerProps> = ({ boxProps, children }) => {
    const theme = useTheme();
    return (
    <Container
        my={24}
        maxW={theme.breakpoints.xl}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...boxProps}
    >
        {children}
    </Container>
    );
};

type ContentContainerHeadingProps = {
    headingProps?: HeadingProps
    withThroughline?: boolean
}
const ContentContainerHeading: FC<ContentContainerHeadingProps> = ({ headingProps, withThroughline = false, children }) => (
    <Heading
        as="h2"
        size="xl"
        textAlign="center"
        mb={2}
        fontFamily="'Fira Sans'; Segoe-UI; sans-serif"
        fontWeight="600"
        maxW={['100%', '90%', '85%', '80%']}
        mx="auto"
        {...headingProps}
        className={withThroughline ? styles.throughline : undefined}
    >
        <span>
            {children}
        </span>
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

const ShareOption: FC<{title: string, description: string, bg: string}> = ({ bg, description, title, children }) => {
    const { colorMode } = useColorMode();
    return (
        <Flex
            direction="column"
            flex={["0 1 auto", "1 0 50%", "1 0 50%", "1 0 33.33%"]}
            align="center"
        >
            <Heading
                textAlign="center"
                as="h3"
                size="md"
                mt={[3, null]}
            >
                {title}
            </Heading>
            <Text
                textAlign="center"
                fontSize="lg"
                mb={4}
            >
                {description}
            </Text>
            <Flex
                bg={bg}
                borderRadius="50%"
                borderColor={colorMode === 'light' ? 'gray.800' : 'gray.600'}
                borderWidth="8px"
                borderStyle="solid"
                mx={[0, 4]}
                w="275px"
                h="275px"
                justify="center"
                direction="column"
            >
                <Flex justify="center" align="center" direction="column" h="150px">
                    {children}
                </Flex>
            </Flex>
        </Flex>
    );
};

const LandingPage: FunctionComponent = () => {
    const {
        isOpen: isAuthOpen,
        onOpen: onAuthOpen,
        onClose: onAuthClose,
    } = useDisclosure();
    const { colorMode } = useColorMode();
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
            title="Coindrop - Accept payments and donations 100% Free with Zero Fees"
            description="Create your page. Let the sender choose how to pay you. Supports all payment apps and cryptocurrencies."
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
            <Container
                my="3rem"
                maxW="98em" // there is no theme.breakpoints.2xl
            >
                <Heading
                    textAlign="center"
                    as="h1"
                    size="2xl"
                    fontFamily="'Fira Sans'; Segoe-UI; sans-serif"
                    fontWeight="600"
                >
                    {'The '}
                    <span
                        className={styles.underline}
                    >
                        easy
                    </span>
                    {/* easy */}
                    {' way to get paid'}
                </Heading>
                <Text fontSize="lg" textAlign="center" mt={3}>
                    List your payment apps. Let the sender choose how to pay you.
                </Text>
                <Text fontSize="lg" textAlign="center" mt={2}>
                    <b>100% free. Zero fees.</b>
                </Text>
                <Center mt={8}>
                    <Image
                        src={`/landing-page/smartphone-mockup-${colorMode}.png`}
                        alt="Smartphone mockup"
                        height="909"
                        width="458"
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
                    <PaymentMethodContainer title="Subscription platforms" paymentMethodCategory="subscription-platform" />
                </Flex>
            </ContentContainer>
            <ContentContainer>
                <ContentContainerHeading withThroughline>
                    ➂ Share &amp; Get Paid
                </ContentContainerHeading>
                <Flex
                    direction={["column", "row"]}
                    wrap="wrap"
                >
                    <ShareOption
                        title="Button"
                        description="For your website"
                        bg={colorMode === 'light' ? 'green.400' : 'green.300'}
                    >
                        <>
                        <Box w="228px" h="57px">
                            <Link href="https://coindrop.to/satoshi-nakamoto" isExternal>
                                <img src="/embed-button.png" style={{borderRadius: "10px", height: "57px", width: "229px"}} alt="Coindrop.to me" />
                            </Link>
                        </Box>
                        </>
                    </ShareOption>
                    <ShareOption
                        title="QR Code"
                        description="For smartphones"
                        bg='#BBCBCB'
                    >
                        <QRCodeExample />
                    </ShareOption>
                    <ShareOption
                        title="URL"
                        description="For literally anywhere"
                        bg={colorMode === 'light' ? 'logoPrimary' : 'orange.300'}
                    >
                        <b>
                            <Text
                                fontSize="lg"
                                color={colorMode === 'light' ? 'gray.800' : 'white'}
                            >
                                coindrop.to/your-name
                            </Text>
                        </b>
                    </ShareOption>
                </Flex>
            </ContentContainer>
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
            <ContentContainer>
                <ContentContainerHeading>
                    Get started 🚀
                </ContentContainerHeading>
                <Text textAlign="center" fontSize="lg">
                    Coindrops are 100% free and only take ~2 minutes to set up.
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
