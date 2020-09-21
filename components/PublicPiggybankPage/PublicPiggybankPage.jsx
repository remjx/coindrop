import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Heading, Text, Box, Flex, Stack, useTheme } from '@chakra-ui/core';
import { useUser } from '../../utils/auth/useUser';
import Footer from './Footer';
import PaymentMethodButton from './PaymentMethodButton';
import ManagePiggybankBar from './ManagePiggybankBar/ManagePiggybankBar';

// TODO: if visited piggybank is users own piggybank, dont render public version, instead render editable version

// Create separate page for editing?
    // // Make update
    //   // .set({ [field]: value });

const PublicPiggybankPage = (props) => {
    const { piggybankData } = props;
    const theme = useTheme();
    const {
        tagline_name: taglineName,
        tagline_description: taglineDescription,
        description,
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
            <Box
                border="1px solid"
                padding="10px"
                boxShadow={`5px 10px ${theme.colors.gray['200']}`}
                my={3}
                mx={3}
                py={6}
            >
                <Heading textAlign="center">
                    <Heading as="span" color="orange.500">{taglineName}</Heading>
                    {' is '}
                    {taglineDescription}
                </Heading>
                <Text textAlign="center">
                    {description}
                </Text>
            </Box>
            <Stack spacing={8} mx={4} my={4} direction="row">
                {addresses.map(([addressField, addressValue]) => (
                    <PaymentMethodButton
                        addressField={addressField}
                        addressValue={addressValue}
                    />
                ))}
            </Stack>
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
