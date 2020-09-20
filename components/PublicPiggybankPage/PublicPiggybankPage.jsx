import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Heading, Text, Box } from '@chakra-ui/core';
import { useUser } from '../../utils/auth/useUser';
import Footer from './Footer';
import PaymentMethodRow from './PaymentMethodRow';
import ManagePiggybankBar from './ManagePiggybankBar/ManagePiggybankBar';

// TODO: if visited piggybank is users own piggybank, dont render public version, instead render editable version

// Create separate page for editing?
    // // Make update
    //   // .set({ [field]: value });

const PublicPiggybankPage = (props) => {
    const { piggybankData } = props;
    const {
        tagline_name: taglineName,
        tagline_description: taglineDescription,
    } = piggybankData;
    const addresses = Object.entries(piggybankData).filter(([field]) => field.startsWith('address_'));
    const router = useRouter();
    const user = useUser();
    return (
        <Box
            maxW="960px"
            mx="auto"
        >
            {user && <ManagePiggybankBar />}
            <Heading textAlign="center">
                <Heading as="span" color="orange.500">{taglineName} is </Heading>
                {taglineDescription}
            </Heading>
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
    piggybankData: PropTypes.object.isRequired,
};

PublicPiggybankPage.defaultProps = {
};

export default PublicPiggybankPage;
