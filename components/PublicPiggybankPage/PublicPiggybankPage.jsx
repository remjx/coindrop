import PropTypes from 'prop-types';
import { Heading, Box, Link, Stack, useTheme } from '@chakra-ui/core';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useUser } from '../../utils/auth/useUser';
import PaymentMethodButton from './PaymentMethodButton';
import ManagePiggybankBar from './ManagePiggybankBar/ManagePiggybankBar';
import PoweredByCoindropLink from './PoweredByCoindropLink';
import PublicPiggybankDataProvider from './PublicPiggybankDataContext';

const PublicPiggybankPage = (props) => {
    const { piggybankDbData } = props;
    const theme = useTheme();
    const { user } = useUser();
    const {
        name,
        website,
        accentColor = "orange",
    } = piggybankDbData;
    const pagePaymentMethodsDataEntries = Object.entries(piggybankDbData.paymentMethods);
    const preferredAddresses = pagePaymentMethodsDataEntries.filter(([, paymentMethodData]) => paymentMethodData.isPreferred);
    const otherAddresses = pagePaymentMethodsDataEntries.filter(([, paymentMethodData]) => !paymentMethodData.isPreferred);
    function PaymentMethodButtonsFromEntries({ entries }) {
        return entries.map(([paymentMethodId, data]) => (
            <PaymentMethodButton
                key={paymentMethodId}
                paymentMethod={paymentMethodId}
                paymentMethodValue={data.address}
                isPreferred={data.isPreferred}
                accentColor={accentColor}
            />
        ));
    }
    const initialSetupComplete = pagePaymentMethodsDataEntries.length > 0;
    return (
        <PublicPiggybankDataProvider
            data={piggybankDbData}
        >
            <Box
                maxW="960px"
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
                    <Box id="initial-setup-complete">
                        <Box
                            padding="10px"
                            my={2}
                            mx={3}
                        >
                            <Heading textAlign="center">
                                {'Choose a payment method to pay '}
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
                    <Heading mt={4} textAlign="center">This piggybank has not been set up yet.</Heading>
                )}
            </Box>
        </PublicPiggybankDataProvider>
    );
};

PublicPiggybankPage.propTypes = {
    piggybankDbData: PropTypes.object.isRequired,
};

PublicPiggybankPage.defaultProps = {
};

export default PublicPiggybankPage;
