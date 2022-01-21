import { FunctionComponent, useContext, useEffect } from 'react';
import { SettingsIcon } from '@chakra-ui/icons';
import { Container, Flex, Center, Heading, Box, Link, useTheme, Wrap, WrapItem, useColorMode, ColorMode, useDisclosure } from '@chakra-ui/react';
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useUser } from '../../utils/auth/useUser';
import { Avatar } from './avatar/Avatar';
import PaymentMethodButton from './PaymentMethodButton';
import ManagePiggybankBar from './ManagePiggybankBar/ManagePiggybankBar';
import PoweredByCoindropLink from './PoweredByCoindropLink';
import { PublicPiggybankDataContext } from './PublicPiggybankDataContext';
import { PaymentMethodDbObjEntry, sortArrayByEntriesKeyAlphabetical } from './util';
import { ToggleColorModeButton } from '../ColorMode/ToggleColorModeButton';
import DataRefetcher from './ManagePiggybankBar/DataRefetcher';

export const getAccentColorLevelInitial = (colorMode: ColorMode): string => (colorMode === 'light' ? '500' : '300');
export const getAccentColorLevelHover = (colorMode: ColorMode): string => (colorMode === 'light' ? '600' : '400');

const PublicPiggybankPage: FunctionComponent = () => {
    const { query: { piggybankName } } = useRouter();
    const { piggybankDbData } = useContext(PublicPiggybankDataContext);
    const theme = useTheme();
    const { user } = useUser();
    const { colorMode } = useColorMode();
    const accentColorLevelInitial = getAccentColorLevelInitial(colorMode);
    const accentColorLevelHover = getAccentColorLevelHover(colorMode);
    const {
        name,
        website,
        accentColor = "orange",
        verb,
        owner_uid,
    } = piggybankDbData;
    const accentColorInitial = theme.colors[accentColor][accentColorLevelInitial];
    const accentColorHover = theme.colors[accentColor][accentColorLevelHover];
    const pagePaymentMethodsDataEntries = Object.entries(piggybankDbData.paymentMethods ?? {});
    const preferredAddresses = pagePaymentMethodsDataEntries.filter(([, paymentMethodData]: any) => paymentMethodData.isPreferred);
    const otherAddresses = pagePaymentMethodsDataEntries.filter(([, paymentMethodData]: any) => !paymentMethodData.isPreferred);
    const WrapGroup: FunctionComponent = ({ children }) => (
        <Wrap
            justify="center"
        >
            {children}
        </Wrap>
    );

    type PaymentMethodButtonsFromEntriesProps = {
        entries: PaymentMethodDbObjEntry[]
    }
    const PaymentMethodButtonsFromEntries: FunctionComponent<PaymentMethodButtonsFromEntriesProps> = ({ entries }) => (
        <WrapGroup>
            {entries
            .sort(sortArrayByEntriesKeyAlphabetical)
            .map(([paymentMethodId, paymentMethodData]) => (
                <WrapItem key={paymentMethodId}>
                    <PaymentMethodButton
                        key={paymentMethodId}
                        paymentMethod={paymentMethodId}
                        paymentMethodValue={paymentMethodData.address}
                        isPreferred={paymentMethodData.isPreferred}
                        accentColor={accentColor}
                    />
                </WrapItem>
            ))}
        </WrapGroup>
    );
    const piggybankExists = !!owner_uid;
    const initialSetupComplete = name && accentColor && verb && pagePaymentMethodsDataEntries.length > 0;
    const configureModalDisclosure = useDisclosure();
    useEffect(() => {
        if (!initialSetupComplete) {
            configureModalDisclosure.onOpen();
        }
    }, []);
    return (
        <>
        <NextSeo
            title={`${name ?? piggybankName}'s Coindrop (coindrop.to/${piggybankName})`}
            description={`Send money to ${name} with no fees`}
        />
        <Container
            maxW={theme.breakpoints.lg}
            mx="auto"
        >
            {user?.id
            && user.id === owner_uid
            && (
                <>
                <DataRefetcher />
                <ManagePiggybankBar
                    editButtonOptions={
                        initialSetupComplete
                        ? ({
                            text: 'Settings',
                            color: undefined,
                            icon: <SettingsIcon />,
                        }) : ({
                            text: 'Settings',
                            color: 'green',
                            icon: <SettingsIcon />,
                        })
                    }
                    initialSetupComplete={initialSetupComplete}
                    configureModalDisclosure={configureModalDisclosure}
                />
                </>
            )}
            {initialSetupComplete ? (
                <Box
                    mb={6}
                >
                    <Box
                        padding="10px"
                        my={2}
                        mx={3}
                    >
                        <Center>
                            <Avatar />
                        </Center>
                        <Heading textAlign="center">
                            Choose a payment method to
                            {` ${verb} `}
                            {website ? (
                                <Link href={website} target="_blank" rel="noreferrer">
                                    <Heading
                                        as="span"
                                        color={accentColorInitial}
                                        textDecoration="underline"
                                        css={css`
                                            &:hover {
                                                color: ${accentColorHover};
                                            }
                                        `}
                                    >
                                            {name}
                                    </Heading>
                                </Link>
                            ) : (
                                <Heading
                                    as="span"
                                    color={accentColorInitial}
                                >
                                        {name}
                                </Heading>
                            )}
                            :
                        </Heading>
                    </Box>
                    <PaymentMethodButtonsFromEntries
                        entries={preferredAddresses}
                    />
                    <PaymentMethodButtonsFromEntries
                        entries={otherAddresses}
                    />
                    <PoweredByCoindropLink />
                </Box>
            ) : (
                <Heading mt={4} textAlign="center">
                    {piggybankExists ? 'This Coindrop has not been set up yet.' : 'This Coindrop does not exist'}
                    {/* TODO: Include action buttons to log in or landing page */}
                </Heading>
            )}
        </Container>
        </>
    );
};

export default PublicPiggybankPage;
