import PropTypes from 'prop-types';
import { Heading, Box, Link, Stack, useTheme } from '@chakra-ui/core';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useUser } from '../../utils/auth/useUser';
import PaymentMethodButton from './PaymentMethodButton';
import ManagePiggybankBar from './ManagePiggybankBar/ManagePiggybankBar';
import PoweredByCoindropLink from './PoweredByCoindropLink';
import PublicPiggybankDataProvider from './PublicPiggybankDataContext';
import { addressFieldPrefix, addressIsPreferredSuffix, getPaymentMethodIdFromPaymentMethodIsPreferredField } from './util';

const PublicPiggybankPage = (props) => {
    const { piggybankDbData } = props;
    const theme = useTheme();
    const {
        name,
        website,
        accent_color: accentColor = "orange",
    } = piggybankDbData;
    const allAddressFields = Object.entries(piggybankDbData);
    const preferredPaymentMethodIds = allAddressFields.reduce((result, item) => {
        const addressFieldName = item[0];
        if (!addressFieldName.endsWith(addressIsPreferredSuffix)) {
            return result;
        }
        return result
            .concat(getPaymentMethodIdFromPaymentMethodIsPreferredField(addressFieldName));
    }, []);
    const addresses = allAddressFields
        .filter(([field]) => (field.startsWith(addressFieldPrefix) && !field.endsWith(addressIsPreferredSuffix)))
        .map(([field, address]) => {
            const paymentMethodId = field.substr(addressFieldPrefix.length);
            return [paymentMethodId, address];
        });
    const preferredAddresses = addresses.filter(address => preferredPaymentMethodIds.includes(address[0]));
    const otherAddresses = addresses.filter(address => !preferredPaymentMethodIds.includes(address[0]));
    const { user } = useUser();
    function renderPaymentMethodButtonFromAddresses(addrs) {
        return addrs.map(([paymentMethod, paymentMethodValue]) => (
            <PaymentMethodButton
                key={paymentMethod}
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
                ...piggybankDbData,
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
    piggybankDbData: PropTypes.object.isRequired,
};

PublicPiggybankPage.defaultProps = {
};

export default PublicPiggybankPage;
