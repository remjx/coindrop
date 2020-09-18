import PropTypes from 'prop-types';
import { Text } from '@chakra-ui/core';

// addresses: Object.entries(piggybank.data()).filter(([field]) => field.startsWith('address_')),
// TODO: if visited piggybank is users own piggybank, dont render public version, instead render editable version

const PublicPiggybankPage = (props) => {
    const { addresses } = props;
    return (
        <Text>
            {Object.entries(addresses).map(address => (
                <Text as="span" key={address[0]}>
                    {address[0]}
                    :
                    {address[1]}
                </Text>
            ))}
        </Text>
    );
};

PublicPiggybankPage.propTypes = {
    addresses: PropTypes.object.isRequired,
};

PublicPiggybankPage.defaultProps = {
};

export default PublicPiggybankPage;
