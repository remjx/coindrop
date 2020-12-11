import { FunctionComponent, useState, useEffect } from 'react';
import { SettingsIcon } from '@chakra-ui/icons';
import { Flex, Center, Heading, Box, Link, useTheme, Wrap, WrapItem } from '@chakra-ui/react';
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useUser } from '../../utils/auth/useUser';
import { Avatar } from './avatar/Avatar';
import PaymentMethodButton from './PaymentMethodButton';
import ManagePiggybankBar from './ManagePiggybankBar/ManagePiggybankBar';
import PoweredByCoindropLink from './PoweredByCoindropLink';
import PublicPiggybankDataProvider, { PublicPiggybankData } from './PublicPiggybankDataContext';
import { PaymentMethodDbObjEntry, sortArrayByEntriesKeyAlphabetical } from './util';
import { db } from '../../utils/client/db';
import { ToggleColorModeButton } from '../ColorMode/ToggleColorModeButton';

type Props = {
    initialPiggybankDbData: PublicPiggybankData
}

const PublicPiggybankPage: FunctionComponent<Props> = (props) => {
    const { initialPiggybankDbData } = props;
    const { query: { piggybankName }, asPath, push } = useRouter();
    const [piggybankDbData, setPiggybankDbData] = useState<PublicPiggybankData>(initialPiggybankDbData);
    async function refreshPiggybankDbData(piggybankId: string): Promise<void> {
        try {
            const piggybankRef = await db
                .collection('piggybanks')
                .doc(piggybankId)
                .get();
            if (piggybankRef.exists) {
                const data = piggybankRef.data() as PublicPiggybankData;
                setPiggybankDbData(data);
            }
        } catch (error) {
            throw new Error(error);
        }
    }
    const theme = useTheme();
    const { user } = useUser();
    const {
        name,
        website,
        accentColor = "orange",
        verb,
        owner_uid,
    } = piggybankDbData;
    useEffect(() => {
        // Force fetch of latest data as static generation may serve old data
        if (user && user.id === owner_uid) {
            push(asPath);
        }
    }, []);
    const pagePaymentMethodsDataEntries = Object.entries(piggybankDbData.paymentMethods ?? {});
    const preferredAddresses = pagePaymentMethodsDataEntries.filter(([, paymentMethodData]) => paymentMethodData.isPreferred);
    const otherAddresses = pagePaymentMethodsDataEntries.filter(([, paymentMethodData]) => !paymentMethodData.isPreferred);
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
            .map(([paymentMethodId, data]) => (
                <WrapItem key={paymentMethodId}>
                    <PaymentMethodButton
                        key={paymentMethodId}
                        paymentMethod={paymentMethodId}
                        paymentMethodValue={data.address}
                        isPreferred={data.isPreferred}
                        accentColor={accentColor}
                    />
                </WrapItem>
            ))}
        </WrapGroup>
    );
    const piggybankExists = !!owner_uid;
    const initialSetupComplete = name && accentColor && verb && pagePaymentMethodsDataEntries.length > 0;
    return (
        <>
        <NextSeo
            title={`${name ?? piggybankName}'s Coindrop (coindrop.to/${piggybankName})`}
            description={`Send money to ${name} with no fees`}
        />
        <PublicPiggybankDataProvider
            data={{
                piggybankDbData,
                setPiggybankDbData,
                refreshPiggybankDbData,
            }}
        >
            <Box
                maxW="1280px"
                mx="auto"
            >
                {user?.id
                && user.id === owner_uid
                && (
                    <ManagePiggybankBar
                        editButtonOptions={
                            initialSetupComplete
                            ? ({
                                text: 'Configure',
                                color: undefined,
                                icon: <SettingsIcon />,
                            }) : ({
                                text: 'Set up',
                                color: 'green',
                                icon: <SettingsIcon />,
                            })
                        }
                        initialSetupComplete={initialSetupComplete}
                    />
                )}
                <Flex mt={2} mr={6} justify="flex-end">
                    <ToggleColorModeButton />
                </Flex>
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
                                            color={theme.colors[accentColor]['500']}
                                            textDecoration="underline"
                                            css={css`
                                                &:hover {
                                                    color: ${theme.colors[accentColor]['600']};
                                                }
                                            `}
                                        >
                                                {name}
                                        </Heading>
                                    </Link>
                                ) : (
                                    <Heading
                                        as="span"
                                        color={theme.colors[accentColor]['500']}
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
                        <PoweredByCoindropLink
                            accentColor={accentColor}
                        />
                    </Box>
                ) : (
                    <Heading mt={4} textAlign="center">
                        {piggybankExists ? 'This Coindrop has not been set up yet.' : 'This Coindrop does not exist'}
                        {/* TODO: Include action buttons to log in or landing page */}
                    </Heading>
                )}
            </Box>
        </PublicPiggybankDataProvider>
        </>
    );
};

export default PublicPiggybankPage;
