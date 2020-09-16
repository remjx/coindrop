import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@chakra-ui/core';

const PublicPiggybankPage = (props) => {
    const { addresses } = props;
    return (
        <Text>
            {Object.entries(addresses).map(address => (
                <Text>
                    {address[0]}
                    :
                    {address[1]}
                </Text>
            ))}
        </Text>
    );
};

PublicPiggybankPage.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    addresses: PropTypes.object,
};

PublicPiggybankPage.defaultProps = {
    addresses: null,
};

export default PublicPiggybankPage;
