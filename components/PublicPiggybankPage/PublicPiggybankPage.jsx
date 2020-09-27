import { useState } from 'react';
import PropTypes from 'prop-types';
import { Heading, Box, Link, Stack, useTheme } from '@chakra-ui/core';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useUser } from '../../utils/auth/useUser';
import PaymentMethodButton from './PaymentMethodButton';
import ManagePiggybankBar from './ManagePiggybankBar/ManagePiggybankBar';
import PoweredByCoindropLink from './PoweredByCoindropLink';
import PublicPiggybankDataProvider from './PublicPiggybankDataContext';
import { sortArrayByEntriesKeyAlphabetical } from './util';
import { db } from '../../utils/client/db';

const PublicPiggybankPage = (props) => {
    // TODO: useSwr to refresh piggybankDbData after initial load
    // TODO: Split out Edit modal into new page?
    // TODO: alphabetize list of payment methods
    const { initialPiggybankDbData } = props;
    const [piggybankDbData, setPiggybankDbData] = useState(initialPiggybankDbData);
    async function refreshPiggybankDbData(piggybankId) {
        try {
            const piggybankRef = await db
                .collection('piggybanks')
                .doc(piggybankId)
                .get();
            if (piggybankRef.exists) {
                const data = piggybankRef.data();
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
    const pagePaymentMethodsDataEntries = Object.entries(piggybankDbData.paymentMethods ?? {});
    const preferredAddresses = pagePaymentMethodsDataEntries.filter(([, paymentMethodData]) => paymentMethodData.isPreferred);
    const otherAddresses = pagePaymentMethodsDataEntries.filter(([, paymentMethodData]) => !paymentMethodData.isPreferred);
    function PaymentMethodButtonsFromEntries({ entries }) {
        return entries
        .sort(sortArrayByEntriesKeyAlphabetical)
        .map(([paymentMethodId, data]) => (
            <PaymentMethodButton
                key={paymentMethodId}
                paymentMethod={paymentMethodId}
                paymentMethodValue={data.address}
                isPreferred={data.isPreferred}
                accentColor={accentColor}
            />
        ));
    }
    const piggybankExists = !!owner_uid;
    const initialSetupComplete = name && accentColor && verb && pagePaymentMethodsDataEntries.length > 0;
    return (
        <PublicPiggybankDataProvider
            data={{
                piggybankDbData,
                refreshPiggybankDbData,
            }}
        >
            <Box
                maxW="1280px"
                mx="auto"
            >
                {user?.id && (
                    <ManagePiggybankBar
                        editButtonOptions={initialSetupComplete ? undefined : {
                            text: 'Set up',
                            color: 'green',
                            iconName: 'settings',
                        }}
                    />
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
                        <Stack spacing={8} mx={4} direction="row" wrap="wrap" justify="center">
                            <PaymentMethodButtonsFromEntries
                                entries={preferredAddresses}
                            />
                        </Stack>
                        <Stack spacing={8} mx={4} direction="row" wrap="wrap" justify="center">
                            <PaymentMethodButtonsFromEntries
                                entries={otherAddresses}
                            />
                        </Stack>
                        <PoweredByCoindropLink
                            accentColor={accentColor}
                        />
                    </Box>
                ) : (
                    <Heading mt={4} textAlign="center">
                        {piggybankExists ? 'This piggybank has not been set up yet.' : 'This piggybank does not exist'}
                        {/* TODO: Include action buttons to log in or landing page */}
                    </Heading>
                )}
            </Box>
        </PublicPiggybankDataProvider>
    );
};

PublicPiggybankPage.propTypes = {
    initialPiggybankDbData: PropTypes.object.isRequired,
};

PublicPiggybankPage.defaultProps = {
};

export default PublicPiggybankPage;
