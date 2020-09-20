import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Text, Box } from '@chakra-ui/core';
import { useUser } from '../../utils/auth/useUser';
import Logo from '../Logo/Logo';
import Footer from './Footer';
import PaymentMethodRow from './PaymentMethodRow';

// TODO: if visited piggybank is users own piggybank, dont render public version, instead render editable version

// Create separate page for editing?
    // // Make update
    //   // .set({ [field]: value });

const PublicPiggybankPage = (props) => {
    const { addresses } = props;
    const router = useRouter();
    const user = useUser();
    console.log('router', router)
    return (
        <Box
            maxW="960px"
            mx="auto"
        >
            <Text>
                {addresses.map(([addressField, addressValue]) => (
                    <PaymentMethodRow
                        addressField={addressField}
                        addressValue={addressValue}
                    />
                ))}
            </Text>
            <Footer />
        </Box>
    );
};

PublicPiggybankPage.propTypes = {
    addresses: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};

PublicPiggybankPage.defaultProps = {
};

export default PublicPiggybankPage;
