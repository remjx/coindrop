import PropTypes from 'prop-types';
import { Heading, Text, Box, Flex, Link, Stack, useTheme } from '@chakra-ui/core';
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useUser } from '../../utils/auth/useUser';
import PaymentMethodButton from './PaymentMethodButton';
import ManagePiggybankBar from './ManagePiggybankBar/ManagePiggybankBar';
import paymentMethods from '../../src/paymentMethods';
import PoweredByCoindropLink from './PoweredByCoindropLink';
import PublicPiggybankDataProvider from './PublicPiggybankDataContext';

// TODO: if visited piggybank is users own piggybank, dont render public version, instead render editable version

// Create separate page for editing?
    // // Make update
    //   // .set({ [field]: value });

const PublicPiggybankPage = (props) => {
    const { piggybankData } = props;
    const theme = useTheme();
    const {
        user_display_name: userDisplayName,
        website,
        accent_color: accentColor = "orange",
    } = piggybankData;
    const allAddressFields = Object.entries(piggybankData);
    // TODO: Make a test for this to ensure that if "address_" format ever changes, it doesn't impact this logic. Or set the substr length to be equal to the prefix length.
    const isAddressFieldPrefix = "address_";
    const addressIsPreferredSuffix = 'is_preferred';
    const addresses = allAddressFields
        .filter(([field]) => (field.startsWith('address_') && !field.endsWith(addressIsPreferredSuffix)))
        .map(([field, value]) => [field.substr(isAddressFieldPrefix.length), value]);
    const preferredPaymentMethodIds = allAddressFields.reduce((result, item) => {
        const addressFieldName = item[0];
        if (!addressFieldName.endsWith(addressIsPreferredSuffix)) {
            return result;
        }
        return result
            .concat(addressFieldName
                .substr(0, addressFieldName.length - addressIsPreferredSuffix.length - 1)
                .substr(isAddressFieldPrefix.length));
    }, []);
    const preferredAddresses = addresses.filter(address => preferredPaymentMethodIds.includes(address[0]));
    const otherAddresses = addresses.filter(address => !preferredPaymentMethodIds.includes(address[0]));
    const { user } = useUser();
    function renderPaymentMethodButtonFromAddresses(addrs) {
        return addrs.map(([paymentMethod, paymentMethodValue]) => (
            <PaymentMethodButton
                paymentMethod={paymentMethod}
                paymentMethodValue={paymentMethodValue}
                isPreferred={preferredPaymentMethodIds.includes(paymentMethod)}
                accentColor={accentColor}
            />
        ));
    }
    const initialSetupComplete = addresses.length > 0;
    return (
        <PublicPiggybankDataProvider
            data={{
                ...piggybankData,
            }}
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
                                                {userDisplayName}
                                        </Heading>
                                    </Link>
                                ) : (
                                    <Heading
                                        as="span"
                                        color={theme.colors[accentColor]['500']}
                                    >
                                            {userDisplayName}
                                    </Heading>
                                )}
                                :
                            </Heading>
                        </Box>
                        <Stack spacing={8} mx={4} direction="row" wrap="wrap" justify="center">
                            {renderPaymentMethodButtonFromAddresses(preferredAddresses)}
                        </Stack>
                        <Stack spacing={8} mx={4} direction="row" wrap="wrap" justify="center">
                            {renderPaymentMethodButtonFromAddresses(otherAddresses)}
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
    piggybankData: PropTypes.object.isRequired,
};

PublicPiggybankPage.defaultProps = {
};

export default PublicPiggybankPage;
